# Project models and ecosystem routing

Read the universal matrix first, then only the sections matching the detected
products.

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

Inspect every `package.json`, workspace declaration, lockfile, package-manager
pin, publishable/private boundary, `files`, `exports`, types, side effects,
license, repository metadata, and build output.

Use release-it when the repository wants an explicit interactive release
orchestrator and its current workflow supports it. A robust setup usually
separates:

- `release`: real release;
- `release:dry`: release-it planning/dry run;
- `release:check`: formatting/lint/types/tests/build/package contract without
  publishing.

Prefer release-it safeguards for the actual branch, clean worktree, quality
hook, conventional release commit/tag, registry access, and explicit
prerelease dist-tag. Treat dry runs as planning evidence only.

For npm/GitHub documentation separation, use the available
`split-npm-github-readme` skill. Apply it at the real package root and inspect a
real tarball. In monorepos, set `repository.directory` where appropriate.

After publishing, verify version, dist-tags, provenance if configured, packed
README, exports, types, and a fresh consumer import/command.

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
checks. Inspect `cargo package` output and test the packaged crate where
practical. Align crate version, Git tag, changelog, and GitHub Release.

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

Test module consumption from a clean temporary module. For binaries, verify
platform archives, checksums, version output, and GitHub Release assets.

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
