# GitHub Actions release authority

Use this reference whenever release tooling, release readiness, or an actual
version publication is in scope for a GitHub-hosted project.

## Single-publisher contract

GitHub Actions is the sole formal publisher for every delivery surface that can
be automated. Local tools may validate and prepare release inputs, but they do
not upload packages, create GitHub Releases, push container images, deploy
production releases, or submit automated store artifacts.

Use one unambiguous release entry point. It may call reusable workflows or
ecosystem-native tools internally, but another local command or independent
workflow must not be able to publish the same version to the same target.

## Choose an explicit trigger

Choose the trigger that fits the repository and record it in the release
contract:

- a release tag prepared locally and pushed intentionally;
- `workflow_dispatch` with an explicit ref/version and optional protected
  environment approval;
- a release-PR merge produced by an established versioning tool, after which
  Actions creates the tag from the approved merge commit.

Do not publish from every generic branch push. Validate that the trigger ref,
manifest version, tag, channel, and prerelease intent agree before any external
write. A tag-driven workflow should reject a mismatched or already-published
version rather than guessing.

If a local orchestrator such as release-it prepares the release, limit it to
quality gates, owned version/changelog updates, the release commit, and the
configured tag/push. Disable its registry upload and GitHub Release creation.
Name local scripts so `check`, `dry`, `prepare`, and the remote Actions publish
step cannot be confused.

## Prefer the common PR-based flow

For a repository that already uses pull requests, prefer this default chain:

1. Product changes enter the protected release branch through ordinary PRs
   that satisfy required reviews and status checks.
2. The release tool creates a dedicated release PR from the current protected
   branch head.
3. That PR updates only the repository's declared version files, release notes
   or changelog, lockfiles, and required generated release outputs. Reject
   unrelated product-code changes or ancestry from an unmerged feature branch.
4. The specific release PR passes its checks and reviews and is merged.
5. One Actions release chain validates the merge commit, creates the release
   tag at that commit, builds the immutable artifacts, and publishes every
   automated delivery target it owns.
6. Independent remote, registry, artifact, consumer, and public checks verify
   the claimed release surfaces.

Open ordinary PRs do not block this chain. Their commits remain outside the
protected release branch and therefore outside the release artifact until they
pass their own merge gates. The release PR does not infer code provenance from
PR titles or scan for a zero-open-PR state; it relies on protected-branch
admission, exact commit ancestry, and a constrained release-only diff.

Inspect the actual branch protection or ruleset rather than assuming the
workflow file enforces it. Require pull requests and the repository's named
checks for the release branch when that collaboration model is chosen. Minimize
or explicitly document bypass actors, and read the remote policy back before
claiming that direct pushes are prevented.

When concurrent merges could invalidate previously passing results, require the
release PR to be current with the protected branch or use the repository's
merge queue. Revalidate the final merge commit before tag creation rather than
assuming the PR head SHA is the released SHA.

## Enforce a release-PR gate

When the repository uses release PRs, only the PR for the version being
released must be merged. Unrelated feature, dependency, or maintenance PRs may
remain open; global zero-open-PR status is not a release requirement.

Make the release PR identifiable through the repository's established release
branch, label, generated metadata, or release tool. Require its normal reviews,
status checks, and protected-base-branch rules. Before any tag or delivery
write, verify that this exact PR is merged into the intended release branch and
that its approved merge commit owns the manifest version and release notes or
changelog when those notes are used.

In this mode:

- local preparation creates or updates the release PR branch but does not
  create or push the release tag;
- a manually pushed tag cannot start publication;
- a manual recovery dispatch must prove the same merged release PR and commit,
  so it cannot become a bypass;
- Actions creates the release tag at the approved merge commit and performs the
  publication in the same controlled workflow or an explicitly called reusable
  workflow;
- retries re-enter the same PR-gated release contract and inspect existing
  delivery state before writing.

Where the repository plan and release identity support it, evaluate a tag
ruleset that restricts manual creation or mutation of release tags as
defense-in-depth. Verify the configured bypass identity and actual remote
behavior before relying on it. The publisher must still reject an unapproved
tag even when no such ruleset is available.

Do not rely on a second tag-push workflow being triggered by a tag created with
the repository's `GITHUB_TOKEN`; GitHub suppresses most new workflow runs caused
by that token. Keep tag creation and publication in the same release chain, or
use an explicitly designed reusable-workflow handoff that does not depend on a
new repository event.

## Separate validation from publication

Run the repository gate before the publish job. Build the distributable
artifact once when practical, transfer it through the workflow's artifact
boundary, and publish the inspected artifact instead of silently rebuilding a
different payload in an unrelated environment.

The publish job should:

- depend on all required checks and package inspections;
- run only for the intended repository, ref, and event;
- use a protected environment when approval or scoped secrets are justified;
- use concurrency that prevents overlapping releases for the same product or
  channel;
- declare minimal job permissions and grant write access only where needed;
- prefer OIDC or the registry's trusted-publishing mechanism over a long-lived
  token;
- follow current official documentation and the repository's action-pinning
  policy instead of copying stale action versions;
- preserve useful artifacts and logs without exposing credentials.

Do not execute untrusted pull-request code in a privileged publish job. Keep
build inputs, downloaded artifacts, generated notes, and shell interpolation
safe across the trust boundary.

## Delivery ownership

Record which Actions job owns each target: package registry, GitHub Release,
binary assets, checksums, container registry, documentation, deployment, update
feed, or automated store submission. One release may fan out to several jobs,
but ownership must be explicit and retries must not create duplicate tags,
Releases, uploads, or deployments.

For partial failure, inspect each target before rerunning. Prefer idempotent
checks and resume only missing delivery steps when the ecosystem safely permits
it. Never fall back to an ad hoc local publish merely because the workflow
failed.

## Human-only exceptions

Some delivery surfaces require physical signing hardware, a local identity,
interactive store UI, organization approval, or review outside GitHub Actions.
Document the exact surface and boundary as an exception. Keep Actions as the
publisher for every other automatable target, and ensure the manual step cannot
republish an artifact already owned by Actions.

An exception is complete only when the handoff artifact, responsible actor,
required approval, and independent post-submission verification are explicit.
