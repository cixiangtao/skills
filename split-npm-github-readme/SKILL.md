---
name: split-npm-github-readme
description: Separate npm package README content from GitHub repository documentation by keeping a minimal link-only README in the published package root and full documentation in .github/README.md. Use when users report stale npm documentation, want npm to link to live GitHub docs, ask npm and GitHub to preview different README files, or want to apply this README structure across npm packages.
---

# Split npm and GitHub README

Use GitHub's documented README precedence (`.github`, repository root, then `docs`) together with npm's root-level package README behavior. Keep the implementation structural; do not add publish-time file swapping or staging scripts unless the repository cannot use this layout.

## Inspect the repository

1. Read applicable repository instructions before editing.
2. Inspect `git status --short`; preserve unrelated and user-owned changes.
3. Read `package.json`, the root README, existing `.github/README*` files, and the `origin` remote.
4. Identify the actual published package root. In a monorepo, this may be a package subdirectory rather than the Git repository root.
5. Confirm the repository is hosted on GitHub. Do not assume GitLab, Bitbucket, or other hosts use GitHub's README precedence.

## Choose the layout

For a package published from the Git repository root, use:

```text
.github/README.md  # Full documentation shown on the GitHub repository home page
README.md          # Minimal README included in and shown for the npm package
```

For a package published from a subdirectory, keep its npm README in that package directory. Do not move the repository's main README unless npm is actually publishing from the repository root.

If `.github/README.md` already exists, inspect it before changing anything. Merge deliberately; never overwrite existing documentation blindly.

## Apply the split

1. Move the current complete root documentation to `.github/README.md` without losing content.
2. Adjust relative links and images whose base changed from the repository root to `.github`. Preserve anchor-only links such as `#installation`.
3. Create a short root `README.md` containing the package name and one prominent absolute link to the GitHub repository.
4. Derive the link from the repository metadata or `origin`; do not guess the owner or repository name.
5. Preserve the repository's existing documentation language and tone unless the user requests different copy.

Use a minimal npm README such as:

```md
# package-name

## [View the full documentation →](https://github.com/owner/repository)
```

Keep only one unambiguous root README in the published package. Do not rely on `files` or `.npmignore` to exclude it: npm treats root README files as special package files.

## Validate the result

1. Confirm the full document was preserved, except for intentional relative-link adjustments.
2. Run `git diff --check` and inspect `git status --short`.
3. Detect the repository's package manager before running a package preview.
4. Prefer that package manager's dry-run pack command. If dry-run is unsupported or blocked, pack into a temporary directory outside the repository.
5. Inspect the resulting file list and archived `package/README.md` directly. Confirm:
   - the package contains the short root README;
   - `.github/README.md` is absent from the tarball;
   - normal package artifacts remain present.
6. Remove temporary pack artifacts created by the validation.

Do not publish, bump a version, commit, or push unless the user separately requests it. Explain that the GitHub repository page updates after pushing the change, while the existing npm package page keeps its old README until the next package version is published.

## Fall back safely

Use a dedicated publish directory only when GitHub precedence cannot solve the repository's layout, such as a non-GitHub host or a release process that publishes a differently assembled package. Prefer a generated publish directory over temporarily replacing and restoring the working-tree README during `prepack`.
