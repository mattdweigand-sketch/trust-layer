# Evidence Map

[![Validate](https://github.com/mattdweigand-sketch/evidence-map/actions/workflows/validate.yml/badge.svg)](https://github.com/mattdweigand-sketch/evidence-map/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Evidence Map is a portable kit for creating AI-assisted work artifacts that can be audited after they look finished.

It is built for source-heavy deliverables: board decks, diligence summaries, workbook reviews, questionnaires, memos, operating reviews, and status reports.

Core rule:

```text
Evidence first. Artifact second.
```

Before drafting the polished artifact, Evidence Map asks for a source packet, a file specification, an evidence map, and a hostile review. The final output should show what it relies on, what is inferred, what is stale, and what still needs human judgment.

## What Evidence Mapping Means

Evidence mapping is how this repo makes AI work auditable.

AI can produce a deck, memo, workbook, or document that looks finished even when the evidence underneath is weak. Evidence mapping prevents that by making every important claim point back to its source.

In this repo, a claim cannot just sit in the final artifact. It needs a source ID, date, owner, confidence level, and review status. If it is inferred, estimated, assumed, or unsupported, it has to say so.

The workflow enforces the order: source packet, file specification, draft deliverable, evidence map, hostile review, final output.

The validators are small scripts that check whether the evidence-mapping files are structured correctly. They do not prove the claim is true. They check that the trust layer is complete enough to review: source IDs are present, dates and owners are captured, confidence is labeled, assumptions and conflicts reference real sources, and numeric claims are not floating around without source dates.

That is the point of the repo: make unsupported claims visible before polished AI work gets shipped.

## Why It Exists

AI can make a deck, memo, or workbook look complete before the facts are actually traceable.

Evidence Map reduces that risk by separating three jobs:

1. Inventory the source material.
2. Map material claims back to evidence.
3. Review the artifact for unsupported claims, stale numbers, hidden assumptions, and unresolved conflicts.

The result is not a guarantee of truth. It is an audit trail that makes the artifact easier to inspect.

## Quick Start

Install dependencies:

```bash
npm install
```

Run the included validation checks:

```bash
npm test
```

Start a guided deliverable workflow:

```bash
npm run setup
```

For a repo-tied AI chat, use:

```text
Run the Evidence Map workflow for this deliverable.
```

The operating procedure lives in `.Codex/commands/evidence-map.md`.

## Workflow

Each run creates numbered audit folders under `deliverables/<project-name>/`:

```text
01-setup-check/
02-source-packet/
03-file-specification/
04-draft-deliverable/
05-evidence-map/
06-hostile-review/
07-final-deliverable/
```

The stages are:

1. Setup check: confirm goal, audience, source files, final format, owner, and approval gates.
2. Source packet: list sources, facts, assumptions, conflicts, stale material, and missing context.
3. File specification: plan the artifact before drafting it.
4. Draft deliverable: create the first artifact from the approved source packet and spec.
5. Evidence map: connect claims, numbers, charts, cells, and tables to source IDs.
6. Hostile review: enumerate unsupported claims and evidence issues.
7. Final deliverable: produce the final version and record accepted risks.

## Repository Map

- `docs/`: concepts, workflow, risk taxonomy, and workflow templates
- `kits/`: reusable modules for source packets, evidence maps, decks, workbooks, and review
- `prompts/`: staged prompt templates
- `schemas/`: JSON schemas for structured Evidence Map artifacts
- `scripts/`: setup helpers and deterministic validators
- `examples/`: synthetic examples used by the validators
- `deliverables/`: local generated outputs, ignored by Git except for `.gitkeep`

## Examples

Validate the included source packet and evidence map examples:

```bash
npm run validate:examples
```

Try the artificial source folder:

```text
Run the Evidence Map workflow.
Use examples/artificial-test-documents as the source folder.
The target artifact is a 5-slide board update deck for the May 2026 board meeting.
Start with the source packet and stop before the file spec.
```

## Project Hygiene

- License: MIT
- Contributing: see `CONTRIBUTING.md`
- Security and data handling: see `SECURITY.md`
- Conduct expectations: see `CODE_OF_CONDUCT.md`

Do not commit private source files, generated deliverables, local paths, customer data, or proprietary business context.
