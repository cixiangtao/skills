# GitHub public surfaces

Apply only the sections relevant to the requested outcome. Keep identity and
URLs semantically coherent, but allow audience-specific descriptions and
README depth. An empty optional field is not automatically a defect.

## GitHub About and discovery

Keep the repository's public identity concise and consistent:

- Description explains what the project is, not how it is implemented.
- Website points to the canonical docs, demo, or product page when one exists
  and a separate URL helps users; leaving it empty can be valid when the
  repository itself is canonical.
- If the user explicitly asks for the URL inside Description, include it there
  too; do not substitute Website silently.
- Topics reflect the product, ecosystem, and primary use cases without keyword
  stuffing.
- Visibility and enabled features match the intended collaboration model.
- Social preview is worth reviewing when discovery or branding is in scope;
  the default GitHub preview is acceptable for many small projects.

After mutation, read the exact fields changed and any identity fields that
directly depend on them back through GitHub rather than trusting the local
plan.

## README and documentation

Ground documentation in actual exports, commands, configuration, behavior, and
support boundaries. A useful repository README normally answers the applicable
questions:

- what the project does and why it exists;
- maturity/status and important platform constraints;
- install or bootstrap path;
- smallest working example;
- links to full docs/demo/API reference;
- development and contribution path when external contribution is expected;
- support/security/reporting path when the project accepts reports;
- license and release/channel expectations relevant to users.

Resolve links from the file's real directory. Do not use repository-relative
links in registry READMEs that render outside GitHub unless that registry
supports them.

For a publishable npm package hosted on GitHub, default toward a stable compact
registry README and richer repository documentation. When the repository root
is also the package root, `.github/README.md` plus the root `README.md` is the
preferred structural layout. This is a strong default for the GitHub+npm
combination, not a universal rule for other hosts or registries.

After resolving the public language strategy when required, use
[npm-github-readme-split.md](npm-github-readme-split.md) when applying or
validating the split, including packed README inspection. In monorepos, keep
the npm README at the actual package root instead of moving unrelated
repository docs. Preserve an explicit single-README decision and avoid
introducing a split during an unrelated localized task. Classify an absent
split as a recommended structural improvement, not a blocking open-source
defect, unless the shared README creates broken package links or materially
misrepresents one of the public surfaces.

## License and community health

Classify these surfaces by the project's stated goal:

- **Blocking for open-source readiness:** a valid license grant and consistent
  manifest/license metadata.
- **Recommended when applicable:** CONTRIBUTING for external contributions,
  SECURITY or another private vulnerability path for maintained software,
  SUPPORT or clear issue/discussion boundaries, and templates that reduce
  recurring triage ambiguity.
- **Optional by maturity:** CODE_OF_CONDUCT for a real contributor community,
  CODEOWNERS for actual maintainers, funding, citation, governance, roadmap,
  and community-profile completeness scores.

Do not use GitHub's community-profile percentage as a universal compliance
score. It measures presence of conventional files, not whether each file is
necessary or truthful for the project.

Do not generate empty ceremony. Every named contact, team, policy, SLA, branch,
or command must exist or be confirmed by the user.

## CI and repository policy

CI should enforce the repository's actual public claims and reproducible gates
using its runtime and package-manager policy. Consider only applicable items:

- formatting/lint/static analysis;
- unit/integration/platform tests;
- build/package/docs checks;
- generated-output drift;
- dependency and secret/security scanning;
- artifact retention and release-only jobs;
- branch protection or rulesets when collaboration or policy requires CI to
  block merges or direct pushes.

Do not claim protections are active from workflow files alone. Read the remote
settings when policy configuration is in scope.

## GitHub Pages and documentation hosting

Before writing a Pages workflow, determine:

- exact default branch and trigger policy;
- install and build commands;
- artifact directory;
- repository subpath versus custom domain;
- router/deep-link behavior;
- generated API/data endpoints;
- Node/runtime/package-manager policy;
- whether another host remains active.

A custom Pages workflow normally needs current supported checkout/setup actions,
the repository's checks and build, Pages configuration, artifact upload,
deployment, `contents: read`, `pages: write`, `id-token: write`, and a
`github-pages` environment exposing the deployment URL. Follow current official
GitHub documentation and repository action-pinning policy rather than copying
stale action versions.

For Vite-like sites without a custom domain, verify the generated repository
base path. For SPAs, choose hash routing, a generated fallback, or another
compatible design intentionally.

When remote publication is authorized:

1. push the intended commit;
2. ensure workflow-source Pages is enabled;
3. inspect the workflow conclusion and deployment URL;
4. fetch the homepage, a built asset, deep routes, and important data files;
5. verify content type/body when an SPA fallback could mask a missing file;
6. read GitHub About back after synchronizing the public URL.

## Hosting migration

Inventory local configuration, remote projects, domains, environment variables,
workflows, and public URLs for both hosts. Prove the new host before removing
the old path. Search for stale URLs, dependencies, scripts, generated metadata,
and tests after cleanup.

Remote deletion is separate from deleting local config. Reconfirm irreversible
deletion, then verify the old endpoint's retired state and the new endpoint's
continued availability.
