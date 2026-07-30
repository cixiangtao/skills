---
name: typescript
description: TypeScript code style, type safety, documentation, and optimization guidelines. Use when writing or reviewing TypeScript code (.ts, .tsx, .mts files), implementing type-safe patterns, documenting TypeScript APIs with JSDoc, or discussing TypeScript code quality and style.
---

# TypeScript Code Style Guide

## Types and Type Safety

- Avoid explicit type annotations when TypeScript can infer
- Avoid implicitly `any`; explicitly type when necessary
- Use accurate types: prefer `Record<PropertyKey, unknown>` over `object` or `any`
- Prefer `interface` for object shapes (e.g., React props); use `type` for unions/intersections
- Prefer `as const satisfies XyzInterface` over plain `as const`
- Prefer `@ts-expect-error` over `@ts-ignore` over `as any`
- Avoid meaningless null/undefined parameters; design strict function contracts

## Async Patterns

- Prefer `async`/`await` over callbacks or `.then()` chains
- Prefer async APIs over sync ones (avoid `*Sync`)
- Use promise-based variants: `import { readFile } from 'fs/promises'`
- Use `Promise.all`, `Promise.race` for concurrent operations where safe

## Code Structure

- Prefer object destructuring
- Use consistent, descriptive naming; avoid obscure abbreviations
- Replace magic numbers/strings with well-named constants
- Defer formatting to tooling

## Comments and JSDoc

Add comments where they preserve intent or contract information that the code and types cannot express clearly. Aim for enough context that a future maintainer can change the code safely, without narrating obvious syntax.

### What to document

- Add JSDoc to exported functions, classes, hooks, components, types, and interfaces when they form a reusable or public API. Document the behavior and contract, not merely the symbol name.
- Document non-obvious parameters, return semantics, thrown errors, side effects, mutation, caching, ordering, time units, data formats, and external-system constraints.
- Add short JSDoc to important internal helpers when their assumptions or edge cases are not clear from the signature.
- Add `/** ... */` comments to interface properties whose units, allowed formats, lifecycle, or business meaning are ambiguous.
- Use `//` comments inside implementations for local reasoning, invariants, compatibility workarounds, or the reason an unusual branch exists.
- Preserve useful existing comments and update them when behavior changes. Remove comments that become false or redundant.

### JSDoc style

- Use standard `/** ... */` JSDoc blocks immediately above the declaration they describe.
- Start with a concise summary. Add a second paragraph only when the caller needs more context.
- Use `@param name - Description` when the parameter's meaning is not already obvious. Do not repeat TypeScript types in JSDoc.
- Use `@returns` when the return value has semantics worth explaining, such as sentinel values, ownership, ordering, or caching.
- Use `@throws` for errors callers are expected to handle, and describe the condition that causes them.
- Use `@remarks`, `@example`, `@defaultValue`, `@deprecated`, and `@see` only when they add actionable information.
- Keep examples short and type-correct. Prefer examples for APIs whose correct usage is otherwise easy to misunderstand.

```ts
/**
 * Resolves the effective retry delay for a failed request.
 *
 * @param attempt - Zero-based retry attempt.
 * @param retryAfterMs - Server-provided delay in milliseconds, when available.
 * @returns A non-negative delay in milliseconds.
 */
export const getRetryDelay = (attempt: number, retryAfterMs?: number) => {
  // Respect the server hint to avoid retrying while the upstream is throttling us.
  if (retryAfterMs !== undefined) return Math.max(0, retryAfterMs);

  return Math.min(1000 * 2 ** attempt, 30_000);
};
```

Avoid comments that only restate the implementation:

```ts
// Increment the count by one.
count += 1;
```

When reviewing or modifying a non-trivial TypeScript file, check whether the changed API or complex logic needs new or updated documentation as part of the change.

## UI and Theming

- Use `@lobehub/ui`, Ant Design components instead of raw HTML tags
- Design for dark mode and mobile responsiveness
- Use `antd-style` token system instead of hard-coded colors

## Performance

- Prefer `for…of` loops over index-based `for` loops
- Reuse existing utils in `packages/utils` or installed npm packages
- Query only required columns from database

## Time Consistency

- Assign `Date.now()` to a constant once and reuse for consistency

## Logging

- Never log user private information (API keys, etc.)
- Don't use `import { log } from 'debug'` directly (logs to console)
- Use `console.error` in catch blocks instead of debug package
