# trust-layer

Reusable Trust Layer kit for turning messy source folders into trustworthy Office artifacts.

## What This Is

This repo packages workflows, prompts, schemas, examples, and lightweight validators for source-grounded deliverables: decks, workbooks, documents, questionnaires, memos, and review reports.

Core rule:

```text
Truth layer first. Artifact second.
```

Every material claim should trace back to source IDs, assumptions, dates, owners, and review status.

## How To Run It

Use these checks before and after changes:

```bash
npm test
npm run validate:examples
```

To start a new deliverable workflow:

```bash
npm run setup
```

For repo-tied chat workflows, use `.Codex/commands/trust-layer.md`.

## Deliverable Workflow

Do not skip the setup check. After setup succeeds, continue automatically. Do not ask the user to paste `next-prompt.txt`.

Stages:

1. Setup check
2. Source packet
3. File specification
4. Draft deliverable
5. Evidence map
6. Hostile review
7. Final deliverable output

Every deliverable must use numbered audit folders:

```text
deliverables/<project-name>/
  01-setup-check/
  02-source-packet/
  03-file-specification/
  04-draft-deliverable/
  05-evidence-map/
  06-hostile-review/
  07-final-deliverable/
```

## Repo Map

- `docs/` — workflow and risk concepts
- `kits/` — reusable workflow modules
- `prompts/` — paste-ready prompts
- `schemas/` — portable JSON contracts
- `examples/` — runnable example packets and maps
- `scripts/` — lightweight validators and setup helpers
- `deliverables/` — generated workflow outputs

## Conventions

- Keep the kit portable and domain-neutral.
- Prefer markdown templates and JSON schemas before code.
- Add validators only for deterministic checks.
- Do not generate PowerPoint, Excel, or Word binaries unless the user explicitly asks.
- Use source IDs such as `S01`, `S02`, `S03`.
- Mark claims as `confirmed`, `inferred`, `estimated`, `assumption`, or `unsupported`.
- Mark confidence as `high`, `medium`, `low`, or `contested`.
- Never present an assumption as a fact.

## Never Do Without Asking

- Do not publish, package, or push this repo externally.
- Do not add dependencies unless a validator needs them.
- Do not rewrite examples to hide validation failures. Fix the source packet or evidence map.
- Do not create a final deliverable before setup check, source packet, file specification, evidence map, and hostile review are complete.

## Deeper Context

- `README.md` — user-facing overview
- `docs/workflow.md` — full staged workflow
- `docs/office-risk-taxonomy.md` — failure modes this kit catches
- `.Codex/commands/trust-layer.md` — repo-tied chat procedure
