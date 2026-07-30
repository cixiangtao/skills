---
name: commit-granularity
description: Enforce focused git commit granularity by grouping diffs by business or technical intent. Use before creating commits, splitting commits, reviewing staged changes, fixing broad commits, or when the user asks to commit code.
---

# Commit Granularity

## Required Gate

Before staging or committing, analyze the full diff and decide how many logical commits are required.

Mandatory rules:

- One commit must represent one clear business intent or technical purpose.
- Split commits when the diff contains independent purposes, such as feature work, bug fixes, style-only cleanup, compatibility changes, generated files, dependency/build changes, tests, or docs.
- Do not mix broad style normalization or mechanical refactors with business behavior changes.
- Do not mix unrelated UI components, pages, services, or domains unless they are required by the same user-visible change.
- Keep generated files with the source change that produced them when they are inseparable; otherwise isolate generated or build artifacts.
- If the split boundary is unclear, stop and ask the user before committing.

## Workflow

1. Inspect `git status`, staged diff, unstaged diff, and recent commit style.
2. Classify every changed file into a commit group by intent.
3. Before running `git add`, tell the user how many commits will be created, the purpose of each commit, and the main files or areas included in each commit.
4. Stage only the files for the current commit group. Avoid `git add -A` unless all changes have one intent.
5. If a single file contains changes for multiple commit groups, split the file edits deliberately before committing or ask the user how to proceed.

## Common Split Examples

- Business feature plus style-only cleanup: split into `feat(...)` and `style(...)`.
- Bug fix plus unrelated refactor: split into `fix(...)` and `refactor(...)`.
- Source change plus inseparable generated CSS or type output: keep together.
- Dependency/config change plus product behavior: split into `build(...)` or `chore(...)` and the product commit.
