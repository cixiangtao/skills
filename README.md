# skill

Personal, opinionated Agent Skills for repeatable development workflows.

## Public skills

- `commit-granularity`: keep Git commits focused on one business or technical intent.
- `typescript`: TypeScript type-safety, documentation, and code-style guidance. It includes opinionated LobeChat, Ant Design, and `antd-style` conventions.
- `split-npm-github-readme`: keep npm package documentation minimal while GitHub shows the full repository documentation.

Each skill is self-contained in its own directory with a `SKILL.md` entrypoint. Copy the skill directories you want into the location supported by your agent.

## Publishing policy

This repository uses an explicit allowlist in `.gitignore`. Skills are private by default and appear in Git only after their directories are deliberately added to the allowlist.
