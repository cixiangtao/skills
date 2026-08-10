# Contributing

Thank you for improving this skill collection. Public additions should be useful beyond one local machine, explicit about execution and verification boundaries, and safe to install without exposing private agent state.

## Before proposing a change

- Search existing issues and skills for overlapping behavior.
- Open an issue before adding a new public skill or changing an existing skill's authority boundary.
- Never include credentials, private URLs, personal paths, proprietary source, local agent state, or copied third-party material without compatible permission and attribution.
- Keep installed or experimental skills private until their public scope has been reviewed and explicitly allowlisted in `.gitignore`.

## Validation

Use the pnpm version declared in `package.json`.

```bash
pnpm install --frozen-lockfile
pnpm check
```

For skill changes, also read the complete `SKILL.md` as a fresh consumer and verify that referenced files, commands, expected outputs, stop conditions, and capability boundaries are internally consistent.

## Pull requests

Keep each pull request focused. Explain the use case, behavior change, authority boundary, verification, and any upstream source or license. Do not modify unrelated local skills or agent configuration. Public files must be deliberately added to the repository allowlist.

By submitting a pull request, you agree to license your contribution under the repository's [MIT License](LICENSE).
