## Outcome

Describe the workflow problem this change solves and the public behavior it changes.

## Scope and authority

- Which skill or repository surface changes?
- What actions may the skill perform, and what remains outside its authority?
- Does the change include or derive from third-party material? If yes, link its source and license.

## Verification

- [ ] `pnpm check`
- [ ] Referenced files and commands were verified.
- [ ] Stop conditions and capability boundaries are explicit.
- [ ] No credentials, private paths, proprietary data, or local agent state are included.
- [ ] New public paths are explicitly allowlisted in `.gitignore`.
