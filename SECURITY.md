# Security

Evidence Map is designed to work with sensitive source material. Treat source files, generated deliverables, and evidence maps as potentially confidential.

## Reporting Issues

If you find a security issue, please do not open a public issue with sensitive details.

Report it privately to the repository maintainer.

## Data Handling

- Do not commit private source documents.
- Do not commit generated deliverables that contain confidential facts, local paths, or customer data.
- Use `examples/` only for synthetic or sanitized examples.
- Use `deliverables/` for local generated output. This folder is ignored by Git except for `.gitkeep`.

## Supported Versions

This project is pre-1.0. Security fixes should target the current `main` branch.
