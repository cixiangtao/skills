---
name: github-open-source-lifecycle
description: "Audit, standardize, publish, release, and maintain GitHub open-source projects across ecosystems. Use this skill when the user asks to make a repository 正规、规范、适合开源、发布就绪 or publicly coherent; review community files, repository policy, CI, documentation hosting, package metadata, versioning, tags, GitHub Releases, or registry/store publication as part of public readiness or release delivery; migrate a public hosting surface; or coordinate an end-to-end release. When a GitHub repository also publishes npm packages, default toward separate npm and GitHub README surfaces and route the implementation through the split-npm-github-readme skill. For a request limited to one public surface, check only that surface and its direct consistency dependencies, not the full governance lifecycle. Do not use it for isolated bug fixes, code/PR review, single issue operations, typo-only edits, isolated CI failure diagnosis, non-public metadata edits, dependency/version bumps without release intent, or simple commit/push tasks."
---

# GitHub Open Source Lifecycle

Make a GitHub project coherent across the public surfaces that matter for its
actual products and maturity. Right-size the work: perform a broad lifecycle
audit only when the user asks for open-source readiness, release readiness, or
an end-to-end review. For a localized request, inspect the requested surface
and its direct dependencies, implement only the authorized scope, and avoid
turning optional maturity improvements into defects.

## Operating principles

1. Inspect before prescribing. Derive the relevant project type, products,
   branches, tools, package roots, generated files, and public URLs from the
   repository and, when the claim requires it, current remote state.
2. Preserve project conventions. Prefer an existing valid release, CI, docs, or
   package strategy over replacing it with a fashionable template.
3. Separate configuration from delivery. A workflow file is not a deployment;
   a build is not an installable package; a dry run is not a published release.
4. Match evidence to the claim. Prove local code locally, packages from real
   artifacts, and public delivery from the remote service or downloaded result.
5. Keep secrets out of source, logs, commands shown to the user, and reports.
6. Re-check current official documentation before changing version-sensitive
   third-party Actions, CLIs, registries, or platform configuration.
7. Distinguish requirements from maturity improvements. Missing optional
   ceremony is not a gap unless the project or user goal makes it relevant.
8. Spend verification effort in proportion to the requested outcome and risk.
   Do not run package, consumer, deployment, or publication checks for an
   unrelated low-risk metadata change.
9. Treat npm registry readers and GitHub repository readers as different
   audiences by default. When both surfaces exist, prefer separate READMEs and
   delegate the layout and tarball checks to `split-npm-github-readme` instead
   of duplicating that workflow here.

## 1. Establish intent and authorization

Translate the request into a concrete finishing line. Use these boundaries:

| Requested intent                        | Authorized work                                                                                       |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Analyze, review, or advise              | Read-only audit and recommendations                                                                   |
| Standardize, add, migrate, or configure | Local edits and proportional validation                                                               |
| Update GitHub settings or About         | Change only the named remote fields and read those fields back                                        |
| Commit                                  | Focused commits, no push                                                                              |
| Push or publish repository changes      | Push and verify the remote branch/workflow                                                            |
| Deploy, go live, or publish docs        | Mutate hosting state and verify public URLs                                                           |
| Release or publish a version            | Perform and verify only the version, ref, and delivery mutations required by the named release target |
| Delete or retire an old public surface  | Reconfirm the exact remote target immediately before irreversible deletion                            |

Do not infer release authority from a request to add release tooling. Do not
infer deletion authority from a hosting migration. Normal implementation steps
inside the authorized local scope do not require repeated confirmation.

Do not infer a GitHub Release, documentation deployment, registry publication,
or extra delivery target merely because another release surface was requested.
Explain any necessary implied mutation, such as pushing the tag required by a
registry release, before executing it.

If the request names only one public surface, inspect its direct consistency
dependencies. For example, adding Pages should reveal whether base paths,
README links, or the canonical public URL would become incorrect. Do not
automatically audit unrelated governance, funding, release signing, or every
repository setting. Fix only authorized surfaces and mention adjacent findings
only when they can break or materially misrepresent the requested outcome.

## 2. Inspect the actual project

Read repository instructions and preserve unrelated or user-owned worktree
changes. Always establish the minimum context needed to avoid acting on the
wrong product or branch:

- Git root, worktree state, branch, upstream, and remotes;
- manifests, workspace/package roots, product type, version owner, and build or
  generated-output boundaries;
- existing conventions directly relevant to the request.

For a broad lifecycle or release-readiness audit, additionally establish the
applicable remote and public state:

- default branch, visibility, GitHub About, relevant enabled features, and
  repository policy;
- install, format, lint, type-check, test, build, pack, docs, and release paths;
- CI, documentation hosting, registries, artifacts, tags, Releases, and latest
  published versions;
- README, license, contribution, support, security, and relevant templates;
- active public URLs and stale delivery paths.

Inspect social preview, funding, citation, governance, CODEOWNERS, wiki,
projects, or similar maturity surfaces only when the user asks for them or the
project's community/product model makes them consequential.

Use fast repository searches and read-only remote/API checks when current
remote state matters and access is available. If an audit is explicitly local
or remote access is unavailable, report that evidence boundary rather than
treating unavailable settings as missing. Never assume the repository root is
the package root in a monorepo.

Read [project-models.md](references/project-models.md) after identifying the
products and ecosystem when broad readiness, packaging, or delivery details
matter. Read only the relevant ecosystem sections.

### Confirm the public language strategy

For broad lifecycle standardization, open-source readiness, release readiness,
or other work that can create, substantially rewrite, or synchronize
user-facing public content, confirm the language strategy before editing unless
the current request or an explicit applicable project instruction already
states it. Existing content being consistently written in one language is
evidence of the current state, not proof that the user wants to preserve that
strategy. This applies to repository and package READMEs, Pages or other
documentation sites, demo copy, release notes, and contributor-facing guidance.

First inspect the existing language conventions and the product's actual
localization support so the question is grounded in the project. Then ask one
structured question:

> Should this project's public content support multiple languages? Separately,
> does the product itself already support localization? Specify the primary
> language, any additional languages, and which surfaces must be translated,
> such as the repository README, package README, Pages or documentation site,
> and release notes.

Do not ask for a localized task that only corrects a URL, typo, metadata value,
or build plumbing and does not change the language or editorial structure of
public content.

Treat product localization and multilingual documentation as separate choices;
do not infer either one from the other. Apply the answer across the public
surfaces in scope. For a multilingual Pages or documentation site, account for
the default locale, routes, language navigation, fallback behavior, and
canonical or alternate-language metadata. For multiple READMEs, make the
primary entry point, language links, package-facing document, and translation
maintenance expectations explicit. Keep single-value surfaces such as GitHub
About understandable in the chosen primary language instead of inventing a
multilingual format they cannot represent cleanly.

## 3. Build the project model

For broad audits and release work, list what users can actually consume:

- source repository or template;
- library/package and its registry;
- CLI or downloadable binaries;
- application, service, container image, extension, or desktop build;
- documentation, demo, website, or API reference;
- GitHub tags, Releases, checksums, provenance, or attestations.

For each product in scope, record its source root, artifact, version owner,
delivery target, canonical URL, and verification method. Add the build command
when build or delivery is in scope. A localized metadata task needs only a
compact product boundary, not a full product matrix.

Before broad or externally mutating work, provide a compact decision:

- current project model;
- requested outcome and stopping point;
- inconsistencies that must be fixed for that outcome;
- material optional improvements outside scope only when they would help the
  user's stated goal;
- risky, destructive, authenticated, or externally mutating steps.

For a clear localized implementation request, proceed without forcing a
lifecycle preamble. Pause only when a missing choice would materially change
the result.

## 4. Standardize universal repository surfaces

Use [github-surfaces.md](references/github-surfaces.md) for the applicable
surface. Keep canonical values semantically coherent without forcing
audience-specific text to be identical:

- GitHub About description, Website, topics, and repository visibility;
- repository and package READMEs;
- package/registry metadata;
- docs, demo, issue tracker, support, and security URLs;
- workflow environment URLs and generated registries/manifests.

When the repository is hosted on GitHub and contains a publishable npm package,
prefer a distinct package README and repository README even when the user did
not explicitly request the split. Read and follow the available
`split-npm-github-readme` skill for the actual package root, link adjustment,
and packed-artifact verification. Preserve an explicit user or repository
decision to maintain one shared README, and do not let this default expand an
unrelated localized task into documentation restructuring.

If the user literally asks for a site address in the GitHub description, place
it in the description as well as the Website field. Do not reinterpret that
wording as Website-only.

Classify public-surface findings before reporting them:

- **Blocking**: prevents the stated open-source or delivery outcome, creates a
  legal contradiction or a major identity conflict that points users to the
  wrong repository, package, version, or delivery target, breaks the consumable
  product, leaks secrets, or materially misrepresents public state.
- **Recommended**: materially improves safe contribution, support, security,
  reproducibility, or enforcement for the project's actual collaboration and
  release model.
- **Optional**: maturity or discovery enhancements whose absence does not make
  the project invalid, such as CODE_OF_CONDUCT for a project without a real
  contributor community, CODEOWNERS for a sole maintainer, funding, citation,
  governance, social preview, wiki, or Projects.

LICENSE becomes blocking when the user wants an open-source project and the
repository has no valid open-source grant or uses contradictory metadata.
CONTRIBUTING, SECURITY, support guidance, issue/PR templates, branch policy,
and release notes are conditional on contribution, security, collaboration,
and release needs. Do not list optional items as missing by default, and do not
invent a maintainer team, response SLA, governance process, legal owner, or
license choice.

When GitHub Pages or another docs host is in scope, inspect the parts of build
configuration, permissions, base paths, routing, canonical URLs, and public
verification that can affect that host. During migration, prefer keeping the
old surface until the replacement is proven when this is feasible and the user
has not accepted downtime; describe cost or platform constraints instead of
treating zero-downtime overlap as universally possible.

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

Every real release design should make its core contract explicit:

- version source and versioning policy;
- release branch and clean-worktree expectations;
- quality/build/package gate;
- commit and tag format;
- intended delivery target and post-release verification.

Evaluate the following only when applicable, and record "not used" or
"not required" instead of manufacturing a gap:

- changelog or release-note source when users need version history;
- prerelease identifiers and moving channels when prereleases exist;
- GitHub Releases and attached artifacts when they are part of the product;
- trusted publishing, signing, checksums, provenance, SBOMs, or notarization
  when supported or justified by ecosystem, artifact, threat model, or policy;
- rollback and partial-failure recovery depth proportional to the number and
  irreversibility of delivery surfaces.

Keep dependency management separate from publishing authority. A repository may
use one tool to install/build and another supported publisher to upload.

## 6. Validate progressively

Read [verification.md](references/verification.md) and select only the evidence
layers needed for the claim:

- For read-only audits, inspect source/config and current remote/public state
  relevant to the findings. Do not run write-heavy generators merely to make
  the audit look exhaustive.
- For low-risk documentation or metadata edits, inspect the diff, resolve
  links/schema where relevant, and run only cheap repository checks likely to
  catch mistakes in those files.
- For code, CI, build, or packaging changes, run the corresponding static,
  test, build, or package checks.
- For package or executable usability claims, inspect a real artifact and use
  a fresh consumer when the change or requested readiness claim can affect
  consumption.
- After push, deployment, or publication, read the exact mutated remote or
  public surfaces back independently.

Re-check worktree/index after any command that may write files. Do not imply a
higher evidence layer than the checks actually performed.

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

Lead with the achieved outcome and exact stopping point. Keep the report
proportional:

- For audits, separate confirmed strengths, blocking gaps, recommended
  improvements, and optional ideas. Omit empty categories and do not inflate
  optional ideas into a compliance score.
- For localized edits, report changed surfaces, relevant validation, and any
  directly related deferred issue.
- For releases or deployments, distinguish local validation, refs/commits,
  workflow state, delivery state, public availability, and remaining human or
  platform actions.
- Mention preserved unrelated changes or pre-existing failures when relevant.

Call the project ready, live, released, or published only when the corresponding
evidence in [verification.md](references/verification.md) has passed.
