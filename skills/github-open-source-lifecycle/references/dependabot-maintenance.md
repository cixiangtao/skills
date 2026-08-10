# Dependabot maintenance governance

Use this reference when the requested outcome is repository-wide or
multi-repository dependency automation, not for a one-off dependency bump.

## 1. Model the real maintenance surface

For every maintained repository, inspect:

- package manifests, lockfiles, workspace roots, and actual package directories;
- the current `.github/dependabot.yml`, Actions workflows, and update history;
- Dependabot security-update settings, alerts when authorized, and whether the
  repository or ecosystem is actually eligible;
- branch protection, required checks and reviews, bot permissions, and any
  repository rules that constrain updates or merging;
- release triggers and whether an ordinary branch merge can publish, deploy, or
  mutate a public delivery surface;
- current bot PR diffs, check results, conflicts, age, and repeated failure or
  recreation patterns.

Mark a repository with no supported dependency manifest or Actions workflow as
not applicable. Do not add an empty or fictional configuration merely for
uniformity.

## 2. Separate security and routine version updates

Dependabot security updates and scheduled version updates serve different
goals. Keep security updates enabled where applicable and treat them with higher
urgency. Cooldown settings for version updates must not be presented as delaying
security remediation.

Use this low-noise baseline when the repository has no stronger established
policy, then adapt it to the actual ecosystem:

- schedule routine version updates monthly;
- apply roughly a 14-day cooldown to avoid adopting brand-new releases
  immediately;
- group compatible minor and patch updates by role, such as production,
  development, toolchain, or GitHub Actions dependencies;
- ignore scheduled SemVer-major updates so they become explicit planned work;
- keep open version-update PR limits small, commonly two per package ecosystem
  and one for GitHub Actions;
- give production and development updates distinct commit prefixes when release
  tooling derives version impact from commit titles;
- group routine GitHub Actions updates and preserve full commit-SHA pinning when
  that is the repository's security convention.

Pre-1.0 minor updates, runtime dependency changes, lockfile-format changes,
package-manager migrations, native or platform-sensitive packages, release
workflows, and security tooling deserve manual risk classification even when
their version number appears small.

## 3. Define merge boundaries before automating

Never auto-merge merely because the author is Dependabot or checks are green.
An unattended merge policy needs all of these constraints:

- exact bot identity and verified Dependabot metadata;
- an allowed dependency class and update type;
- all required checks complete and successful;
- branch protection and repository rules still satisfied;
- no release, publishing, permission, workflow-trust, major-version, or other
  high-risk change outside the declared policy.

Keep majors, pre-1.0 minors, production updates without explicit coverage,
release-workflow changes, and failing or incomplete checks under maintainer
review unless the repository records a narrower explicit exception.

An ordinary dependency PR may update the protected branch, but it must not
directly publish a version. Preserve the repository's separate release-PR,
tag, or explicit-dispatch admission gate; merging a dependency PR does not
authorize a registry publication, GitHub Release, store submission, or
production deployment.

## 4. Triage existing bot PRs deliberately

Apply and validate the durable policy before bulk triage when feasible. Then:

1. inspect the exact changed files and dependency role;
2. refresh the branch only when the PR is useful and the authorization permits
   remote mutation;
3. merge only useful, in-policy updates whose required checks are green and
   whose release effect is understood;
4. close obsolete, duplicated, superseded, out-of-policy, or repeatedly failing
   noise with a concise reason;
5. leave useful but unproven PRs open rather than treating pending checks as
   success.

Do not close a security update merely because it is inconvenient or ungrouped.
Do not merge a release PR as part of dependency cleanup unless the user
separately authorized that release.

## 5. Verify at the matching evidence layer

Validate YAML syntax and the supported Dependabot options locally. After push,
verify the merged configuration on the default branch, read security-update
settings back, and inspect the next Dependabot run or resulting PRs when the
platform has processed the configuration. Confirm merged and closed PR states
individually.

Report pending platform processing as pending. A valid configuration does not
prove that GitHub has scheduled updates, a green PR does not prove runtime
compatibility beyond its checks, and a merged dependency PR does not prove or
authorize public release delivery.
