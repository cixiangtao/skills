# Project models and ecosystem routing

Read the universal matrix first, then only the sections matching the detected
products. The evidence column describes release/readiness proof, not the
minimum validation for every metadata or documentation edit.

## Universal product matrix

| Shape                      | Public products                            | Primary evidence                              | Frequent mistake                          |
| -------------------------- | ------------------------------------------ | --------------------------------------------- | ----------------------------------------- |
| Source project or template | Repository, tags, optional Releases        | Fresh clone/bootstrap                         | Adding an unused registry or site         |
| Library/package            | Registry artifact, docs, source            | Packed and fresh-installed artifact           | Trusting source/build alone               |
| CLI                        | Registry/binary, help output, Releases     | Fresh install plus command smoke test         | Testing only imports                      |
| Static site/docs/demo      | Public URL and static artifact             | Built files plus deployed HTTP/content        | Treating workflow success as site proof   |
| Service/API                | Image/binary, deployment, API contract     | Immutable artifact plus health/contract probe | Confusing image push with rollout         |
| Desktop/mobile app         | Signed installer/bundle, release channel   | Install/launch/update proof                   | Ignoring signing/notarization             |
| Browser extension          | ZIP/store submission, privacy/support URLs | Deterministic package and store state         | Calling pending review published          |
| Monorepo                   | Multiple independent products              | Per-product roots and version owners          | Releasing the workspace root accidentally |

## Node and npm

For broad readiness or publishing work, inspect every relevant `package.json`,
workspace declaration, lockfile, package-manager pin, publishable/private
boundary, `files`, `exports`, types, side effects, license, repository metadata,
and build output. For a localized task, inspect only the package roots and
fields that can affect the requested surface.

Use Release Please when a single versioned package can derive release intent
reliably from Conventional Commit squash titles. Use Changesets when a
workspace has independently versioned packages or wants each product PR to
declare release impact. In either model, Actions remains the formal npm
publisher and the maintainer normally releases by merging the generated
release PR.

Use release-it only when the repository still wants an explicit local
release-preparation orchestrator and its current workflow supports it. A robust
local setup usually separates:

- `release:prepare`: local version/changelog/commit preparation, plus a tag
  only for an explicitly tag-driven flow without a release-PR gate;
- `release:dry`: local preparation planning/dry run;
- `release:check`: formatting/lint/types/tests/build/package contract without
  publishing.

Prefer release-it safeguards for the actual branch, clean worktree, quality
hook, release commit, and tag. Disable its npm upload and GitHub Release
creation so the tag push or explicit dispatch enters the sole Actions publisher.
Require an explicit prerelease dist-tag only when the project publishes
prereleases. Treat dry runs as planning evidence only.

When release PRs are the gate, configure release-it to stop at the PR branch or
release commit. It must not create or push the final release tag; Actions owns
that tag after the specific release PR merges.

When release-PR creation is automated, remove redundant local version/changelog
scripts if they create a competing source of truth. Ensure the controller's
credential can trigger the required PR checks automatically; release-PR runs
created by the default `GITHUB_TOKEN` currently wait for explicit workflow
approval. Prefer a short-lived, repository-scoped GitHub App installation token
over a long-lived maintainer token.

When a publishable npm package is hosted in a GitHub repository, prefer
separate registry and repository README surfaces by default. Resolve the
public language strategy when required, then use
[npm-github-readme-split.md](npm-github-readme-split.md) rather than
reproducing its migration steps:

- if the repository root is also the package root, keep the full repository
  documentation in `.github/README.md` and a compact npm-facing `README.md` at
  the root;
- if a package is published from a subdirectory, preserve the repository-level
  README and keep the npm-facing README inside that package directory;
- preserve an explicit decision to use one shared README, or an existing
  publish-directory assembly that already separates the two audiences.

Apply the decision at every real package root, inspect a real tarball, and set
`repository.directory` where appropriate in monorepos.

In Actions, prefer npm trusted publishing when the package and account support
it. After publishing, verify version and relevant dist-tags, provenance only
when configured or claimed, packed public metadata and contracts, and a
representative fresh consumer import or command.

## Python and PyPI

Inspect `pyproject.toml`, selected build backend, source layout, import package,
version source, dependency groups, wheel/sdist configuration, typed-package
markers, supported Python versions, and publishing tool.

Keep metadata consistent across PyPI and GitHub: name, description, license,
classifiers, project URLs, repository, issues, docs, changelog, and Python
requirements.

Build both wheel and source distribution when supported. Inspect their contents
and install the wheel in a fresh environment. Run an import or CLI smoke test.
Publish from GitHub Actions using the repository's trusted-publishing flow when
supported; otherwise use a minimally scoped Actions secret without inventing or
storing credentials in source. Verify the artifact downloaded from PyPI or
TestPyPI after publication.

## Rust and crates.io

Inspect workspace members, publish flags, crate names, versions, feature flags,
`Cargo.toml` metadata, README/license inclusion, MSRV policy, lockfile policy,
and binary/library outputs.

Run the repository's format, lint, test, documentation, package, and publish
checks applicable to the requested outcome. Inspect `cargo package` output and
test the packaged crate where practical. Let Actions own crates.io upload and
GitHub Release creation. Align crate version and Git tag; align changelog and
GitHub Release only when the project uses those surfaces.

For distributable CLIs, decide whether platform binaries, checksums, signatures,
install scripts, and cargo-binstall metadata are part of the release. Verify
crates.io separately from GitHub Release assets.

## Go modules and binaries

Inspect the module path in `go.mod`, supported Go version, packages/commands,
generated code, embedded assets, and whether the repository is a library,
application, or CLI.

For libraries, semantic module tags are the release surface; major versions
must follow Go module path conventions. Let the release tag enter Actions even
when no registry upload is needed. For CLIs, run an existing GoReleaser or
equivalent path inside the Actions publisher rather than introducing a second
local release system.

Test module consumption from a clean temporary module when release readiness or
consumption is in scope. For binaries, verify platform archives, checksums,
version output, and GitHub Release assets only for the delivery surfaces the
project actually uses or claims.

## JVM, Maven, and Gradle

Identify the real group/artifact/version owner, modules, wrapper versions,
repositories, signing requirements, Java compatibility, generated POM/module
metadata, sources, and documentation artifacts.

Follow the existing Maven or Gradle build and versioning model, with repository
publication owned by Actions. Validate the staged repository output before
central publication. Signing, namespace ownership, and central-portal state are
external prerequisites, not code-level success.

## Containers and services

Identify the Dockerfile/build system, image registry, architectures, runtime
configuration, health checks, migration requirements, and deployment owner.

Use immutable version and commit-based tags in addition to any moving channel
tag. Let Actions own image publication and automated production deployment.
Inspect the built image, labels, SBOM/provenance policy, vulnerability results,
startup behavior, and health endpoint. Verify registry publication and
deployment rollout separately.

## Binaries, desktop applications, and extensions

Map source version to every manifest, installer, update feed, store package, and
release asset. Validate archives deterministically before upload. Let Actions
own automatable GitHub Release assets, update feeds, and store submissions.

Treat code signing, notarization, privacy policies, OAuth/store credentials,
review queues, staged rollout, and platform dashboards as distinct delivery
layers. A successful upload can still be unavailable to users.
