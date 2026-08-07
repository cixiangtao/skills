# Release design

Use this reference for versioning, tags, GitHub Releases, registries, binaries,
containers, or store submissions.

## Release contract

Write down the core contract before changing release tools. Mark conditional
concerns as not used or not required rather than treating every empty cell as a
gap:

| Concern        | Decision                                                                                                                |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Version owner  | Manifest/file/workspace that owns the public version                                                                    |
| Version policy | SemVer, calendar versioning, ecosystem convention, or existing policy                                                   |
| Release source | Protected branch, exact commit, and ordinary-PR ancestry expected to be released                                        |
| Gate           | Protected-branch checks, constrained release PR, merge, builds, generated drift, packaging, smoke tests                 |
| Notes          | Changelog, conventional commits, curated notes, GitHub-generated notes, or not used when release notes are not promised |
| Git            | Release commit, tag pattern, push behavior                                                                              |
| Authority      | GitHub Actions entry point, trigger, and ownership of each automated delivery target                                    |
| Delivery       | Registry, GitHub Release, docs/site, image, store, update feed                                                          |
| Prerelease     | Identifier and channel/tag behavior when prereleases exist                                                              |
| Security       | Credential boundary plus trusted publishing, signing, provenance, or checksums when supported or required               |
| Recovery       | Partial-failure boundary proportional to the number and irreversibility of delivery surfaces                            |
| Verification   | Independent remote/artifact/public checks                                                                               |

Adopt existing conventions unless they are broken, conflict with the Actions
single-publisher contract, or the user requests a migration. Avoid multiple
tools owning the same version, changelog, or tag.

For GitHub-hosted projects, treat local preparation and formal publication as
different owners. Follow [github-actions-release.md](github-actions-release.md):
GitHub Actions is the sole publisher for automatable delivery targets, while
local tools are limited to validation and release input preparation.

## Pre-release and stable channels

Keep versions and delivery channels explicit. Examples include npm `beta` or
`next`, PyPI prerelease versions, container channel tags, GitHub prereleases, or
store testing tracks.

After publishing, inspect every relevant moving channel. Publishing a beta does
not imply `latest` should move; moving `latest` does not prove a store or site
updated. Report the intended and actual state separately.

## GitHub Releases

Decide whether Git tags alone are enough. Use GitHub Releases when users need
curated notes, binaries, checksums, installers, SBOM/provenance, or a visible
download surface.

Verify:

- tag target and release commit;
- draft/prerelease/latest flags;
- release title and notes;
- asset filenames, sizes, hashes, signatures, and platform coverage;
- public download behavior.

Do not create duplicate tags/releases when retrying a partially failed flow.

## Authentication and secrets

Prefer supported trusted publishing or short-lived credentials in the Actions
publisher. Use minimal job permissions and protected environments when the
release risk or approval model justifies them. Do not preserve a local
publisher merely because a project is small. Keep real values out of repository
files, terminal output copied into reports, workflow debug logs, and chat.
Document variable names, source, purpose, and required permissions without
recording secret values.

Browser authentication, OTP, signing hardware, notarization, organization
approval, namespace ownership, and store review may require the user. Keep the
process alive when appropriate, pause at the real interaction boundary, and
continue verification afterward.

## Failure classification

Classify before retrying:

- local validation or packaging failure;
- dirty worktree, tag collision, or branch mismatch;
- generated output changed during hooks/build;
- DNS/network/registry outage;
- missing permission, expired credential, OTP, or policy rejection;
- signing/notarization failure;
- successful upload awaiting external review;
- partial remote mutation.

After failure, inspect version files, index, worktree, local/remote tags,
workflow run and job state, registry state, release state, and artifacts. Do not
assume a local orchestrator or Actions retry fully rolled back, or that a
timed-out push or upload did nothing. Repair or retry through the configured
Actions publisher rather than opening a local publication path.

## Post-release verification

Verify each in-scope surface from outside the release process. Skip surfaces
the project does not use or claim:

- remote branch and tag resolve to intended commits;
- GitHub Release state/assets are correct when used;
- registry version and channel metadata are correct;
- downloaded published artifact has the expected identity and contents;
- fresh consumer install/import/run succeeds;
- docs/site/update feed exposes the intended version;
- old prerelease or latest channels remain correct;
- worktree is clean or any residual change is explained.
