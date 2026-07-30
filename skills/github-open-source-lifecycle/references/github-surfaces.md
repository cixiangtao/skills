# GitHub public surfaces

Apply only the sections relevant to the requested outcome.

## GitHub About and discovery

Keep the repository's public identity concise and consistent:

- Description explains what the project is, not how it is implemented.
- Website points to the canonical docs, demo, or product page when one exists.
- If the user explicitly asks for the URL inside Description, include it there
  too; do not substitute Website silently.
- Topics reflect the product, ecosystem, and primary use cases without keyword
  stuffing.
- Visibility and enabled features match the intended collaboration model.
- Social preview is readable at small sizes and does not expose private data.

After mutation, read Description, Website, topics, visibility, and default
branch back through GitHub rather than trusting the local plan.

## README and documentation

Ground documentation in actual exports, commands, configuration, behavior, and
support boundaries. A useful repository README normally answers:

- what the project does and why it exists;
- maturity/status and important platform constraints;
- install or bootstrap path;
- smallest working example;
- links to full docs/demo/API reference;
- development and contribution path;
- support/security/reporting path;
- license and release/channel expectations.

Resolve links from the file's real directory. Do not use repository-relative
links in registry READMEs that render outside GitHub unless that registry
supports them.

For npm packages that need a stable compact registry README and richer GitHub
documentation, use `.github/README.md` for GitHub and the package-root
`README.md` for npm. Use the dedicated split skill and verify a packed tarball.
Do not generalize this GitHub-specific layout to other hosts or registries.

## License and community health

Audit these files and GitHub settings:

- LICENSE and manifest license identifiers;
- CONTRIBUTING and local development instructions;
- SECURITY and private vulnerability reporting path;
- CODE_OF_CONDUCT when a real community needs it;
- SUPPORT or clear issue/discussion boundaries;
- issue forms/templates and pull-request template;
- CODEOWNERS for real maintainers;
- funding, citation, governance, and roadmap when applicable.

Do not generate empty ceremony. Every named contact, team, policy, SLA, branch,
or command must exist or be confirmed by the user.

## CI and repository policy

CI should run the repository's actual reproducible gates using pinned runtime
and package-manager policy. Consider:

- formatting/lint/static analysis;
- unit/integration/platform tests;
- build/package/docs checks;
- generated-output drift;
- dependency and secret/security scanning;
- artifact retention and release-only jobs;
- branch protection or rulesets.

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
