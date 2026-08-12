#!/usr/bin/env node

import fs from "node:fs";

const args = process.argv.slice(2);
const json = args.includes("--json");
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const mode = modeArg?.slice("--mode=".length) || "hybrid";
const validModes = new Set(["narrative", "technical", "hybrid"]);
const files = args.filter((arg) => arg !== "--json" && !arg.startsWith("--mode="));

if (!validModes.has(mode)) {
  console.error(`Unknown mode: ${mode}. Use narrative, technical, or hybrid.`);
  process.exit(2);
}

if (files.length === 0) {
  console.error(
    "Usage: node scripts/check-prose-patterns.mjs [--json] [--mode=narrative|technical|hybrid] <markdown...>",
  );
  process.exit(2);
}

const patterns = [
  [
    "boilerplate-opening",
    "blocking",
    /在当今.{0,20}(时代|背景下)|随着.{0,24}(发展|进步)|本文将(讨论|介绍|探讨)|接下来让我们|让我们来看看/g,
  ],
  [
    "empty-transition",
    "blocking",
    /值得注意的是|不难发现|不难看出|众所周知|显而易见|毫无疑问|不可否认|综上所述|总而言之/g,
  ],
  ["ai-catchphrase", "advisory", /说白了|意味着什么|这意味着|本质上|换句话说|总的来说/g],
  ["anonymous-attribution", "advisory", /有人认为|业内普遍认为|研究表明|有数据显示|专家指出/g],
  [
    "structured-triad",
    "blocking",
    /首先[^。！？\n]{0,100}[。；;][\s\S]{0,240}?其次[^。！？\n]{0,100}[。；;][\s\S]{0,240}?最后/g,
  ],
  ["teaching-voice", "blocking", /下面(?:我们|我)来|首先需要了解|接下来(?:我们|我)将|让我们深入/g],
];

function stripNonProse(text) {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`\n]+`/g, "")
    .replace(/!?(\[[^\]\n]*\])\([^\n)]+\)/g, "$1")
    .replace(/^>.*$/gm, "")
    .replace(/^#{1,6}\s+.*$/gm, "");
}

function lineNumber(text, index) {
  return text.slice(0, index).split("\n").length;
}

function addMatches(findings, text, rule, severity, pattern) {
  pattern.lastIndex = 0;
  for (const match of text.matchAll(pattern)) {
    findings.push({
      rule,
      severity,
      line: lineNumber(text, match.index),
      excerpt: match[0].slice(0, 80),
    });
  }
}

function scan(file) {
  const original = fs.readFileSync(file, "utf8");
  const prose = stripNonProse(original);
  const findings = [];

  for (const [rule, severity, pattern] of patterns) {
    addMatches(findings, prose, rule, severity, pattern);
  }

  if (mode === "narrative") {
    addMatches(findings, prose, "report-punctuation", "advisory", /：|——|[“”"]/g);
  } else if (mode === "hybrid") {
    addMatches(findings, prose, "report-punctuation", "advisory", /——|[“”"]/g);
  }

  const headings = [...original.matchAll(/^#{2,6}\s+(.+)$/gm)];
  const proseLength = prose.replace(/\s/g, "").length;
  const headingRange = {
    narrative: [0, 2],
    technical: [4, 8],
    hybrid: [3, 6],
  }[mode];
  const [minimumHeadings, maximumHeadings] = headingRange;
  if (proseLength >= 1200 && headings.length < minimumHeadings) {
    findings.push({
      rule: "insufficient-navigation",
      severity: "advisory",
      line: 1,
      excerpt: `${headings.length} heading(s) in ${mode} mode; expected about ${minimumHeadings}-${maximumHeadings}`,
    });
  }
  if (headings.length > maximumHeadings) {
    findings.push({
      rule: "excessive-navigation",
      severity: "advisory",
      line: lineNumber(original, headings[maximumHeadings].index),
      excerpt: `${headings.length} heading(s) in ${mode} mode; expected about ${minimumHeadings}-${maximumHeadings}`,
    });
  }

  const listItems = [...original.matchAll(/^\s*[-*+]\s+\S/gm)];
  const listLimit = { narrative: 4, technical: 14, hybrid: 9 }[mode];
  if (listItems.length >= listLimit) {
    findings.push({
      rule: "list-density",
      severity: "advisory",
      line: lineNumber(original, listItems[0].index),
      excerpt: `${listItems.length} bullet item(s); consider turning report-like lists into prose`,
    });
  }

  const boldCount = (original.match(/\*\*[^*\n]+\*\*/g) || []).length;
  if (boldCount >= 6) {
    findings.push({
      rule: "bold-density",
      severity: "advisory",
      line: 1,
      excerpt: `${boldCount} bold spans found`,
    });
  }

  const paragraphs = prose
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const shortParagraphs = paragraphs.filter((paragraph) => paragraph.length <= 18).length;
  const shortParagraphRatio = { narrative: 0.7, technical: 0.35, hybrid: 0.5 }[mode];
  if (paragraphs.length >= 10 && shortParagraphs / paragraphs.length > shortParagraphRatio) {
    findings.push({
      rule: "overperformed-fragmentation",
      severity: "advisory",
      line: 1,
      excerpt: `${shortParagraphs}/${paragraphs.length} paragraphs are 18 characters or fewer`,
    });
  }

  return findings.map((finding) => ({ file, ...finding }));
}

const findings = files.flatMap(scan);

if (json) {
  process.stdout.write(`${JSON.stringify({ findings }, null, 2)}\n`);
} else if (findings.length === 0) {
  console.log("No deterministic prose-pattern findings.");
} else {
  for (const item of findings) {
    console.log(`${item.severity}\t${item.rule}\t${item.file}:${item.line}\t${item.excerpt}`);
  }
  console.log(
    `\n${findings.length} finding(s). Advisory findings are review prompts, not automatic failures.`,
  );
}

process.exit(findings.some((item) => item.severity === "blocking") ? 1 : 0);
