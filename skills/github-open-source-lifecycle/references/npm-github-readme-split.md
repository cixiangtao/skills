# npm and GitHub README split workflow

This is an internal workflow of `github-open-source-lifecycle`, not an
independent public entry point. The lifecycle skill owns intent,
authorization, scope, and public-language decisions before this workflow is
used.

## Preconditions

Use this workflow only when all applicable conditions hold:

- the repository is hosted on GitHub;
- at least one npm package is publishable from the repository;
- the user directly requests separate npm and GitHub documentation, or broad
  readiness or packaging work makes the two audiences relevant;
- no explicit user or repository decision requires one shared README.

A README split creates or reorganizes public documentation. If it creates,
substantially rewrites, translates, or synchronizes public copy, resolve the
language strategy in the lifecycle skill before editing. Existing content in
one language is evidence of current state, not authorization to keep that
language. If the strategy is unresolved, return to the lifecycle language gate
instead of making a local language decision here.

Do not introduce a split during an unrelated typo, URL, metadata, CI, or build
plumbing task. A strictly mechanical fix that does not change language or
editorial structure does not require this workflow.

## Inspect the repository

1. Read applicable repository instructions before editing.
2. Inspect the worktree and preserve unrelated or user-owned changes.
3. Read the package manifests, repository README, existing
   `.github/README*` files, npm publish configuration, and `origin` remote.
4. Identify every actual published package root. Never assume the Git
   repository root is also the package root in a monorepo.
5. Confirm the host is GitHub. Other hosts do not necessarily use GitHub's
   README precedence.
6. Derive repository URLs from verified manifest metadata or `origin`; do not
   guess the owner or repository name.

## Choose the layout

GitHub searches for a repository README in `.github`, the repository root, and
then `docs`, while npm publishes the README found at the package root. For a
package published from the Git repository root, prefer:

```text
.github/README.md  # Full repository documentation shown by GitHub
README.md          # Compact package documentation published to npm
```

For a package published from a subdirectory, preserve the repository-level
README and keep the npm-facing README in the actual package directory. Apply
the decision separately to each publishable package. Set `repository.directory`
where appropriate so registry metadata identifies a monorepo package's source.

If `.github/README.md` already exists, inspect and merge deliberately. Never
overwrite existing public documentation blindly. Preserve a valid existing
publish-directory assembly when it already separates the audiences safely.

## Apply the split

For a root-published package:

1. Move the complete repository documentation to `.github/README.md` without
   losing content.
2. Adjust relative links and images for the new `.github` base. Preserve
   anchor-only and already-correct absolute links.
3. Create a compact root `README.md` containing the package identity and clear
   absolute links to the full GitHub documentation.

For a subdirectory-published package, update only that package's README unless
the authorized scope independently includes repository documentation.

Write compact README copy in the resolved primary language. If the selected
strategy requires multiple public languages, include the agreed language entry
points without turning the npm README back into a second full manual. Preserve
the chosen tone and terminology; do not infer them solely from the previous
single-language document.

A compact single-language structure may look like:

```md
# package-name

## [View the full documentation →](https://github.com/owner/repository)
```

Treat the wording as an example, not a mandate. Keep one unambiguous README at
each published package root. Do not rely on `files` or `.npmignore` to exclude
it because npm treats root README files as special package files.

## Validate the package artifact

1. Confirm the full repository document was preserved except for intentional
   link and language-strategy changes.
2. Inspect the diff and worktree, including whitespace errors.
3. Detect the repository's package manager and pack from the actual package
   root into a temporary directory outside the repository.
4. Inspect the archive file list and archived `package/README.md` directly.
5. Confirm that the compact package README is present, the repository-only
   `.github/README.md` is absent, and normal package artifacts remain present.
6. Remove temporary package artifacts and re-check the worktree.

Do not substitute a source-tree inspection for the real tarball when claiming
what npm users will receive.

## Delivery boundary

Do not publish, bump a version, commit, or push unless separately authorized.
Explain that GitHub shows the new repository README only after the change is
pushed, while an already-published npm version retains its old README until a
new package version is published.

## Fallbacks

Do not apply the `.github/README.md` layout to GitLab, Bitbucket, or another
host merely because the project publishes to npm. Use a dedicated generated
publish directory only when host precedence or an existing assembled package
cannot provide separate surfaces. Prefer that stable package assembly over a
`prepack` script that temporarily replaces and restores the working-tree
README.
