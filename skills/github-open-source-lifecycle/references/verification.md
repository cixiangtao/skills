# Verification layers

Choose the highest layer required by the user's requested outcome. Lower layers
cannot prove higher-layer claims.

| Layer    | What it proves                                  | Example evidence                                  |
| -------- | ----------------------------------------------- | ------------------------------------------------- |
| Source   | Intended files/config changed coherently        | Diff, residual search, metadata comparison        |
| Static   | Repository rules accept the change              | Format, lint, types, schema/config validation     |
| Test     | Behavior passes covered scenarios               | Unit, integration, platform tests                 |
| Build    | A concrete artifact can be produced             | Docs/site build, wheel, crate, JAR, binary, image |
| Package  | Distribution contents and contracts are correct | Archive inspection, exports, metadata, checksums  |
| Consumer | A fresh user can consume it                     | Temp install/import/run/bootstrap                 |
| Remote   | GitHub accepted the intended state              | Branch/tag SHA, API readback, Actions conclusion  |
| Delivery | Registry/host/store accepted the artifact       | Registry metadata, deployment/store state         |
| Public   | Users can access the expected result            | Download/fetch/install from public surface        |

## Source and static checks

- Inspect complete status and diff before and after changes.
- Preserve unrelated edits and generated ownership boundaries.
- Run `git diff --check`.
- Use the repository's pinned toolchain and real scripts.
- Recheck status after formatters, hooks, generators, release rollback, or
  version commands.

## Artifact checks

- Inspect actual output paths rather than expected paths from configuration.
- Check identity, version, files, permissions, executable bits, exports, types,
  licenses, README, manifests, and source maps as applicable.
- Ensure private/test/demo/secrets/debug assets are absent when required.
- Use deterministic or checksum comparison when reproducibility matters.

## Consumer checks

Create a fresh temporary location outside the repository. Install from the
packed artifact using the ecosystem's normal consumer path, then exercise the
smallest representative import, command, bootstrap, or startup.

Do not let workspace linking, local caches, or undeclared source files make the
smoke test pass accidentally.

## Remote and public checks

After push or publication:

- read branch and tag SHAs from the remote;
- inspect relevant Actions jobs and logs;
- read GitHub About/settings back;
- query registry version/channel metadata;
- download the public artifact rather than reusing the local one;
- fetch deployed URLs and validate body/content type, not just HTTP status;
- distinguish pending review, staged rollout, draft, prerelease, and public
  availability.

## Final claim vocabulary

- **Configured**: local/remote configuration exists.
- **Validated**: applicable local checks passed.
- **Built/packed**: an artifact was produced and inspected.
- **Pushed**: remote refs contain the change.
- **Deployed**: hosting accepted a deployment.
- **Submitted**: a registry/store received it but it may await review.
- **Published/live**: an external user can retrieve the expected result.
- **Verified**: the claimed public state was independently checked.
