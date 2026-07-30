import { execFileSync, spawnSync } from "node:child_process";

const lintableFile = /\.(?:[cm]?[jt]s|[jt]sx|vue|svelte|astro)$/u;
const trackedFiles = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard", "-z"],
  {
    encoding: "utf8",
  },
)
  .split("\0")
  .filter((file) => file && lintableFile.test(file));

if (trackedFiles.length === 0) {
  process.exit(0);
}

const executable = process.platform === "win32" ? "oxlint.cmd" : "oxlint";
const result = spawnSync(executable, [...process.argv.slice(2), ...trackedFiles], {
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
