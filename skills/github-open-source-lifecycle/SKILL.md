---
name: github-open-source-lifecycle
description: "Audit, standardize, publish, release, and maintain GitHub open-source projects across ecosystems. Use this skill whenever the user asks to make a GitHub project 正规、规范、适合开源或可发布; prepare a repository for public use; add or migrate GitHub Pages or documentation hosting; synchronize GitHub About, homepage, topics, README, and package metadata; add LICENSE, CONTRIBUTING, SECURITY, issue or pull-request templates; establish CI, changelog, versioning, tags, GitHub Releases, or registry publishing; review release readiness; or coordinate an end-to-end release to npm, PyPI, crates.io, Maven, container registries, binaries, or other ecosystems. Also use it when the user requests one public-facing change, such as GitHub Pages or package publishing, that should be checked against the rest of the project's public delivery lifecycle. Do not use it for an isolated bug fix, ordinary code review, a single issue or pull request, or a simple commit/push with no project-lifecycle work."
---

# GitHub Open Source Lifecycle

Make a GitHub project coherent across source, documentation, collaboration,
delivery, and release surfaces. Apply a broad audit but a narrow execution
scope: discover related gaps, implement only what the user authorized, and
report the rest without silently expanding the task.

## Operating principles

1. Inspect before prescribing. Derive project type, products, branches, tools,
   package roots, generated files, and public URLs from the repository and
   remote state.
2. Preserve project conventions. Prefer an existing valid release, CI, docs, or
   package strategy over replacing it with a fashionable template.
3. Separate configuration from delivery. A workflow file is not a deployment;
   a build is not an installable package; a dry run is not a published release.
4. Match evidence to the claim. Prove local code locally, packages from real
   artifacts, and public delivery from the remote service or downloaded result.
5. Keep secrets out of source, logs, commands shown to the user, and reports.
6. Re-check current official documentation before changing version-sensitive
   third-party Actions, CLIs, registries, or platform configuration.

## 1. Establish intent and authorization

Translate the request into a concrete finishing line. Use these boundaries:

| Requested intent                        | Authorized work                                                            |
| --------------------------------------- | -------------------------------------------------------------------------- |
| Analyze, review, or advise              | Read-only audit and recommendations                                        |
| Standardize, add, migrate, or configure | Local edits and proportional validation                                    |
| Commit                                  | Focused commits, no push                                                   |
| Push or publish repository changes      | Push and verify the remote branch/workflow                                 |
| Deploy, go live, or publish docs        | Mutate hosting state and verify public URLs                                |
| Release or publish a version            | Version, tag, push, publish, and verify the requested release surfaces     |
| Delete or retire an old public surface  | Reconfirm the exact remote target immediately before irreversible deletion |

Do not infer release authority from a request to add release tooling. Do not
infer deletion authority from a hosting migration. Normal implementation steps
inside the authorized local scope do not require repeated confirmation.

If the request names only one public surface, inspect its dependencies and
neighbors. For example, adding Pages should reveal whether GitHub About,
README links, package metadata, or base paths would become inconsistent. Fix
only authorized surfaces; list other inconsistencies as follow-up findings.

## 2. Inspect the actual project

Read repository instructions and preserve unrelated or user-owned worktree
changes. Establish:

- Git root, status, branch, upstream, remotes, default branch, and visibility;
- repository owner/name plus current GitHub About description, Website, topics,
  social preview, and enabled features;
- languages, manifests, lockfiles, workspace/package roots, build outputs, and
  generated files;
- install, format, lint, type-check, test, build, pack, docs, and release paths;
- existing CI, Pages/docs hosting, release automation, registries, artifacts,
  tags, and latest published versions;
- README, license, contribution, support, security, governance, and templates;
- active public URLs and stale hosting/configuration paths.

Use fast repository searches and read-only remote/API checks. Never assume the
repository root is the package root in a monorepo.

Read [project-models.md](references/project-models.md) after identifying the
products and ecosystem. Read only the relevant ecosystem sections.

## 3. Build the project model

List what users can actually consume:

- source repository or template;
- library/package and its registry;
- CLI or downloadable binaries;
- application, service, container image, extension, or desktop build;
- documentation, demo, website, or API reference;
- GitHub tags, Releases, checksums, provenance, or attestations.

For each product, record its source root, build command, artifact, version
owner, delivery target, canonical URL, and verification method. This prevents a
workspace root, demo app, or generated directory from being released by
accident.

Before editing, provide a compact decision:

- current project model;
- requested outcome and stopping point;
- inconsistencies that must be fixed for that outcome;
- optional improvements outside scope;
- risky, destructive, authenticated, or externally mutating steps.

For a clear implementation request, proceed after this short orientation.
Pause only when a missing choice would materially change the result.

## 4. Standardize universal repository surfaces

Use [github-surfaces.md](references/github-surfaces.md) for the applicable
surface. Keep all canonical values aligned:

- GitHub About description, Website, topics, and repository visibility;
- repository and package READMEs;
- package/registry metadata;
- docs, demo, issue tracker, support, and security URLs;
- workflow environment URLs and generated registries/manifests.

If the user literally asks for a site address in the GitHub description, place
it in the description as well as the Website field. Do not reinterpret that
wording as Website-only.

Audit LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT, support guidance,
issue/PR templates, CODEOWNERS, funding, citation, and social preview. Add only
the files justified by project maturity and the user's scope. Do not invent a
maintainer team, response SLA, governance process, or legal owner.

When GitHub Pages or another docs host is in scope, treat build configuration,
workflow permissions, base paths, routing behavior, GitHub About, README links,
custom domains, and public verification as one connected chain. Hosting
migrations must keep the old surface until the new one is proven, unless the
user explicitly accepts downtime.

## 5. Choose ecosystem-native release operations

Read [releases.md](references/releases.md) and the matching section of
[project-models.md](references/project-models.md).

Use the repository's ecosystem-native package and release conventions:

- Node/npm may use release-it when it fits the existing workflow;
- Python should align builds and publishing with its selected backend and PyPI;
- Rust should align Cargo metadata, crates.io, binaries, and checksums;
- Go libraries rely on module-compatible Git tags, while CLIs may use
  GoReleaser or an equivalent existing path;
- JVM projects should follow the actual Maven/Gradle and repository setup;
- containers, desktop applications, and extensions require artifact-specific
  versioning and delivery proof.

Do not add release-it to non-Node projects merely for consistency. It may be a
generic orchestrator, but ecosystem-native tooling and existing project
conventions take priority.

Every release design should make these explicit:

- version source and versioning policy;
- release branch and clean-worktree expectations;
- quality/build/package gate;
- changelog or release-note source;
- commit and tag format;
- registry/repository access and prerelease channel;
- GitHub Release and attached artifacts, if used;
- signing, checksums, provenance, or notarization requirements;
- rollback behavior and post-release verification.

Keep dependency management separate from publishing authority. A repository may
use one tool to install/build and another supported publisher to upload.

## 6. Validate progressively

Read [verification.md](references/verification.md) and select the evidence
layers matching the requested outcome.

At minimum:

1. inspect the final diff and run repository formatting/static checks;
2. run relevant tests and builds without racing shared output cleanup;
3. inspect generated directories, archives, manifests, exports, binaries, or
   images directly;
4. use a fresh temporary consumer when package or executable usability matters;
5. re-check worktree and index after hooks, generators, version bumps, or
   release rollback;
6. after push, read remote branch, tags, Actions, and GitHub metadata back;
7. after deployment, verify public content and important deep/data endpoints;
8. after publication, download the published artifact and verify registry
   metadata, channels/dist-tags, identity, contents, and basic consumption.

Never describe a pending review, queued workflow, local artifact, or draft
release as publicly available.

## 7. Coordinate commits and external changes

When commit work is authorized, split changes by durable intent rather than by
file type. Typical boundaries are repository policy, documentation/metadata,
hosting, package/release automation, and generated artifacts. Use available
commit-focused skills when appropriate.

Push only when requested. Publishing a package or deployment often implies the
necessary release commit/tag push, but verify that interpretation from the
request and report each remote surface independently.

Before destructive remote cleanup:

1. resolve the exact project, deployment, domain, artifact, tag, or release;
2. prove the replacement or backup state;
3. ask for immediate confirmation when deletion is irreversible;
4. verify both the retired and replacement surfaces afterward.

## 8. Report the outcome

Lead with the achieved public outcome and exact stopping point. Report:

- detected project model and products;
- canonical repository, documentation, package, release, and support URLs;
- changed surfaces and intentionally deferred recommendations;
- local checks, artifact checks, remote checks, and public checks separately;
- commit, push, workflow, deployment, registry, and review status separately;
- authentication, review, signing, dashboard, or maintainer actions still
  required;
- preserved unrelated changes or pre-existing failures.

Call the project ready, live, released, or published only when the corresponding
evidence in [verification.md](references/verification.md) has passed.
