# Contributing

Thanks for considering a contribution to Evidence Map.

## What Belongs Here

Good contributions improve the portable workflow:

- clearer prompts
- stronger schemas
- deterministic validators
- better examples
- workflow documentation
- audit and verification patterns

Keep the project domain-neutral. Avoid adding company-specific, industry-specific, or customer-specific workflows unless they are clearly generalized.

## Local Check

Before opening a pull request, run:

```bash
npm test
```

This validates the included examples.

## Pull Request Checklist

- Keep generated deliverables out of version control.
- Add or update examples when changing schemas or validators.
- Update docs when changing the workflow.
- Do not weaken validation just to make an example pass.
- Do not include private source files, local file paths, customer data, or proprietary business context.

## Style

Prefer plain Markdown, simple JSON, and small validators. Add code only when the check can be deterministic.
