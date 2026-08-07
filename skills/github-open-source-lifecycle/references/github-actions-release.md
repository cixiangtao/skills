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

### Automate the release PR itself

Use an established controller rather than requiring a maintainer to edit the
same version and changelog files repeatedly:

- Prefer Release Please for a single versioned product when merged commit
  titles already provide reliable Conventional Commit intent.
- Prefer Changesets for multiple independently versioned packages or when the
  project wants each product PR to carry an explicit release-impact file.
- Preserve another controller that already provides the same protected-branch,
  constrained-diff, version, notes, and merge guarantees.

The controller may run after ordinary pushes to the protected branch so it can
create or update a release PR. That broad trigger is not publication authority:
publishing still requires proof that the controller's specific release PR was
merged and that the final merge commit owns the proposed version.

Do not call controller-created PRs operational until their required checks can
actually run. GitHub suppresses most workflow events caused by the repository
`GITHUB_TOKEN`. If the release PR must pass Actions checks, authenticate the
controller with a token whose writes generate normal events:

1. Prefer a GitHub App installed only on the intended repositories, with the
   minimum contents, pull-request, and issue/label permissions the controller
   needs.
2. Generate a short-lived installation token inside the controller job. Keep
   the App client ID in a repository variable and the private key in an Actions
   secret; explicitly scope the runtime token to the current repository.
3. Use a fine-grained maintainer token only when creating and maintaining a
   GitHub App is disproportionate. Document ownership, repository scope,
   expiration, and rotation.

Do not solve event suppression by removing required checks, granting a broad
branch bypass, or requiring a human to push an empty commit to the generated
branch. If no suitable credential is configured, fail the controller clearly
before claiming the release PR is automated.

### Keep finalization retryable

The simplest controller examples often create the tag and GitHub Release
before a package build. Strengthen that sequence for a real publisher:

1. On the release-PR merge commit, re-prove the PR identity, base branch,
   allowed diff, manifest version, and current protected-branch ancestry.
2. Build, test, pack, and inspect immutable artifacts before remote release
   finalization.
3. Invoke the controller's release-finalization mode, or an equivalent
   Actions-owned step, to create or verify the tag and GitHub Release at the
   exact merge commit.
4. Publish the already inspected artifacts and verify every delivery target.
5. On retry, accept an existing tag, Release, or registry version only when its
   commit and artifact identity match, then resume the missing steps.

For Release Please, this can be one workflow with two controller invocations:
the ordinary-push path maintains release PRs without creating Releases, while
the gated post-merge path finalizes the release without creating another PR.
Do not rely on a tag event emitted by either invocation to start a second
workflow.

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

- established automation creates or updates the release PR branch; local tools
  are optional validation helpers and do not create or push the release tag;
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
by that token. For pull-request open and synchronize events, GitHub currently
creates approval-required runs rather than unattended CI. Keep tag creation and
publication in the same release chain, and use a GitHub App installation token
when an automated release PR must run required checks without separate approval.

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
