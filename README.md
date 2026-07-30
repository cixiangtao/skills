# skill

Personal, opinionated Agent Skills for repeatable development workflows.

## Repository layout

- `skills/` contains installed skills. Each skill is self-contained in its own directory with a `SKILL.md` entrypoint.
- `scripts/` and the root configuration files maintain and validate the repository.
- Local installation state, third-party skills, and plugins stay untracked unless they are deliberately allowlisted.

## Public skills

- `skills/commit-granularity`: keep Git commits focused on one business or technical intent.
- `skills/typescript`: TypeScript type-safety, documentation, and code-style guidance. It includes opinionated LobeChat, Ant Design, and `antd-style` conventions.
- `skills/split-npm-github-readme`: keep npm package documentation minimal while GitHub shows the full repository documentation.

Copy the skill directories you want into the location supported by your agent.

## Development

Install dependencies with `pnpm install`, then use:

- `pnpm format` to format tracked public files with Oxfmt.
- `pnpm format:check` to check formatting without writing files.
- `pnpm lint` to lint tracked JavaScript and TypeScript files with Oxlint.
- `pnpm check` to run all read-only quality checks.

## Publishing policy

This repository uses an explicit allowlist in `.gitignore`. Agent state and installed skills are private by default and appear in Git only after their paths are deliberately added to the allowlist.
