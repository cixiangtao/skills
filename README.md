# skills

Personal, opinionated Agent Skills for repeatable development workflows.

[![skills.sh](https://skills.sh/b/cixiangtao/skills)](https://skills.sh/cixiangtao/skills)

## Repository layout

- `skills/` contains installed skills. Each skill is self-contained in its own directory with a `SKILL.md` entrypoint.
- `scripts/` and the root configuration files maintain and validate the repository.
- Local installation state, third-party skills, and plugins stay untracked unless they are deliberately allowlisted.

## Public skills

- `skills/commit-granularity`: keep Git commits focused on one business or technical intent.
- `skills/github-open-source-lifecycle`: audit, standardize, release, and maintain GitHub open-source projects across ecosystems, including npm/GitHub README separation.

## Install from skills.sh

Browse the collection on [skills.sh](https://skills.sh/cixiangtao/skills), or install from the source repository with the Skills CLI:

```bash
npx skills add cixiangtao/skills
```

Install one skill directly when you do not need the full collection:

```bash
npx skills add cixiangtao/skills --skill commit-granularity
npx skills add cixiangtao/skills --skill github-open-source-lifecycle
```

The CLI detects supported agents and lets you choose where to install the selected skills. You can also copy a skill directory into the location supported by your agent.

## Development

Install dependencies with `pnpm install`, then use:

- `pnpm format` to format tracked public files with Oxfmt.
- `pnpm format:check` to check formatting without writing files.
- `pnpm lint` to lint tracked JavaScript and TypeScript files with Oxlint.
- `pnpm check` to run all read-only quality checks.

## Publishing policy

This repository uses an explicit allowlist in `.gitignore`. Agent state and installed skills are private by default and appear in Git only after their paths are deliberately added to the allowlist.
