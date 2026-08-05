---
name: git-commit
description: 'Execute git commit with Conventional Commit message analysis, intelligent staging, and type-mapped emoji at the start of the subject. Use when user asks to commit changes, create a git commit, or mentions "/commit". Supports: (1) Auto-detecting type, emoji, and scope from changes, (2) Generating commitlint-compatible conventional commit messages with subject emojis, (3) Interactive commit with optional type/scope/description overrides, (4) Intelligent file staging for logical grouping'
license: MIT
allowed-tools: Bash
---

# Git Commit with Subject Emojis

## Overview

Create standardized, semantic commits that keep the Conventional Commit header parseable while adding a type-mapped emoji at the start of the subject. Analyze the actual diff to determine the appropriate type, emoji, scope, and message.

## Conventional Commit Format

```
<type>[optional scope][!]: <emoji> <description>

[optional body]

[optional footer(s)]
```

Place exactly one matching emoji as the first token of the subject: one ASCII space after the colon, then the emoji, then one ASCII space before the description. This preserves the conventional `type(scope): subject` structure expected by default commitlint parsers.

## Commit Types

| Emoji | Type       | Purpose                        |
| ----- | ---------- | ------------------------------ |
| ✨    | `feat`     | New feature                    |
| 🐛    | `fix`      | Bug fix                        |
| 📝    | `docs`     | Documentation only             |
| 💄    | `style`    | Formatting/style (no logic)    |
| ♻️    | `refactor` | Code refactor (no feature/fix) |
| ⚡️    | `perf`     | Performance improvement        |
| ✅    | `test`     | Add/update tests               |
| 📦️    | `build`    | Build system/dependencies      |
| 🎡    | `ci`       | CI/config changes              |
| 🔨    | `chore`    | Maintenance/misc               |
| ⏪️    | `revert`   | Revert commit                  |

Before using this fallback mapping, inspect repository-level commit conventions such as `commitlint.config.*`, `.commitlintrc*`, and `cz.config.*`. Follow a repository-defined type-to-emoji mapping when present. If a hook explicitly rejects the generated subject, report the conflict instead of silently omitting the emoji or skipping the hook.

## Breaking Changes

```
# Exclamation mark after type/scope
feat!: ✨ remove deprecated endpoint

# BREAKING CHANGE footer
feat(config): ✨ allow config to extend other configs

BREAKING CHANGE: `extends` key behavior changed
```

## Workflow

### 1. Analyze Diff

```bash
# If files are staged, use staged diff
git diff --staged

# If nothing staged, use working tree diff
git diff

# Also check status
git status --porcelain
```

### 2. Stage Files (if needed)

If nothing is staged or you want to group changes differently:

```bash
# Stage specific files
git add path/to/file1 path/to/file2

# Stage by pattern
git add *.test.*
git add src/components/*

# Interactive staging
git add -p
```

**Never commit secrets** (.env, credentials.json, private keys).

### 3. Generate Commit Message

Analyze the diff to determine:

- **Type + emoji**: What kind of change is this, and which mapped emoji belongs at the start of its subject?
- **Scope**: What area/module is affected?
- **Description**: One-line summary of what changed (present tense, imperative mood, <72 chars)

Examples:

```text
feat(auth): ✨ add passkey sign-in
fix(parser): 🐛 handle empty input
docs: 📝 clarify release workflow
refactor(core)!: ♻️ remove legacy adapter
```

### 4. Execute Commit

```bash
# Single line
git commit -m "<type>[scope][!]: <emoji> <description>"

# Multi-line with body/footer
git commit -m "$(cat <<'EOF'
<type>[scope][!]: <emoji> <description>

<optional body>

<optional footer>
EOF
)"
```

## Best Practices

- One logical change per commit
- Present tense: "add" not "added"
- Imperative mood: "fix bug" not "fixes bug"
- Reference issues: `Closes #123`, `Refs #456`
- Keep description under 72 characters

## Git Safety Protocol

- NEVER update git config
- NEVER run destructive commands (--force, hard reset) without explicit request
- NEVER skip hooks (--no-verify) unless user asks
- NEVER force push to main/master
- If commit fails due to hooks, fix and create NEW commit (don't amend)
