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

Use release-it when the repository wants an explicit interactive release
orchestrator and its current workflow supports it. A robust setup usually
separates:

- `release`: real release;
- `release:dry`: release-it planning/dry run;
- `release:check`: formatting/lint/types/tests/build/package contract without
  publishing.

Prefer release-it safeguards for the actual branch, clean worktree, quality
hook, release commit/tag, and registry access. Require an explicit prerelease
dist-tag only when the project publishes prereleases. Treat dry runs as
planning evidence only.

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

After publishing, verify version and relevant dist-tags, provenance only when
configured or claimed, packed public metadata and contracts, and a
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
Use the repository's existing trusted-publishing or token flow; never invent or
store credentials. Verify the artifact downloaded from PyPI or TestPyPI after
publication.

## Rust and crates.io

Inspect workspace members, publish flags, crate names, versions, feature flags,
`Cargo.toml` metadata, README/license inclusion, MSRV policy, lockfile policy,
and binary/library outputs.

Run the repository's format, lint, test, documentation, package, and publish
checks applicable to the requested outcome. Inspect `cargo package` output and
test the packaged crate where practical. Align crate version and Git tag;
align changelog and GitHub Release only when the project uses those surfaces.

For distributable CLIs, decide whether platform binaries, checksums, signatures,
install scripts, and cargo-binstall metadata are part of the release. Verify
crates.io separately from GitHub Release assets.

## Go modules and binaries

Inspect the module path in `go.mod`, supported Go version, packages/commands,
generated code, embedded assets, and whether the repository is a library,
application, or CLI.

For libraries, semantic module tags are the release surface; major versions
must follow Go module path conventions. For CLIs, follow an existing GoReleaser
or equivalent path when present rather than introducing a second release
system.

Test module consumption from a clean temporary module when release readiness or
consumption is in scope. For binaries, verify platform archives, checksums,
version output, and GitHub Release assets only for the delivery surfaces the
project actually uses or claims.

## JVM, Maven, and Gradle

Identify the real group/artifact/version owner, modules, wrapper versions,
repositories, signing requirements, Java compatibility, generated POM/module
metadata, sources, and documentation artifacts.

Follow the existing Maven or Gradle release and publishing model. Validate the
staged repository output before central publication. Signing, namespace
ownership, and central-portal state are external prerequisites, not code-level
success.

## Containers and services

Identify the Dockerfile/build system, image registry, architectures, runtime
configuration, health checks, migration requirements, and deployment owner.

Use immutable version and commit-based tags in addition to any moving channel
tag. Inspect the built image, labels, SBOM/provenance policy, vulnerability
results, startup behavior, and health endpoint. Verify registry publication and
deployment rollout separately.

## Binaries, desktop applications, and extensions

Map source version to every manifest, installer, update feed, store package, and
release asset. Validate archives deterministically before upload.

Treat code signing, notarization, privacy policies, OAuth/store credentials,
review queues, staged rollout, and platform dashboards as distinct delivery
layers. A successful upload can still be unavailable to users.
