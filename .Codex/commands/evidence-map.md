# Evidence Map Workflow

Run this whenever the user wants to create a deliverable from source files: deck, workbook, document, questionnaire, memo, or review report.

Do not start source analysis until the setup check is complete.

If no setup check exists for the requested deliverable, run `npm run setup` or collect the same required fields directly. After setup succeeds, read the generated `setup-check.md` and `intake.md` yourself and continue. Do not ask the user to paste `next-prompt.txt`.

Each deliverable folder must use this audit structure:

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

## Stage 0: Setup Check

First say:

```text
I will run a setup check first, then walk through source packet, file spec, draft, evidence map, hostile review, and final deliverable output. I will stop where approval or missing context is required.
```

Confirm these fields before continuing:

- artifact type: deck, workbook, document, questionnaire, memo, or review report
- intended audience
- decision or use case
- source files or source folder
- output folder, usually `deliverables/<project-name>/`
- final format needed: markdown, PDF, PPTX, XLSX, DOCX, or other
- deadline or review owner, if relevant
- approval gates: source packet approval, file spec approval, final review approval

If any required field is missing, ask for it and stop.

Produce:

- `deliverables/<project-name>/01-setup-check/setup-check.md`
- `deliverables/<project-name>/01-setup-check/intake.md`

The setup check must show:

```text
Setup status: ready | blocked
Artifact type:
Audience:
Decision or use case:
Sources:
Output folder:
Final format:
Human reviewer:
Approval gates:
Blocking questions:
```

Only continue when `Setup status` is `ready`.

Then run:

```bash
node scripts/validate-setup-check.js deliverables/<project-name>/01-setup-check/setup-check.md
```

After validation passes, continue directly to Stage 1. The user should not need a second manual trigger.

## Stage 1: Source Packet

Use `prompts/01-source-packet.md`.

Produce:

- `deliverables/<project-name>/02-source-packet/source-packet.json`
- `deliverables/<project-name>/02-source-packet/source-packet.md`

Rules:

- Do not draft the final artifact.
- Assign source IDs like `S01`, `S02`, `S03`.
- Separate facts, assumptions, estimates, conflicts, and missing context.
- If a decision-critical conflict exists, stop and ask the user how to resolve or label it.

Then run:

```bash
node scripts/validate-source-packet.js deliverables/<project-name>/02-source-packet/source-packet.json
```

Ask the user to approve the source packet before moving to the file specification.

## Stage 2: File Specification

Use `prompts/02-file-spec.md`.

Produce:

- `deliverables/<project-name>/03-file-specification/file-spec.md`

Rules:

- Do not render the final artifact yet.
- Mark unsupported or consequential claims as `needs_human`.
- For decks, every slide headline should be a claim, not a topic.
- For workbooks, define tabs, raw data, assumptions, calculations, outputs, and checks.

Ask the user to approve the spec before creation.

## Stage 3: Draft Deliverable

Create the artifact only from the approved source packet and file spec.

Save outputs in the matching deliverables folder:

- `deliverables/<project-name>/04-draft-deliverable/draft-deliverable.md` for markdown or text deliverables
- `deliverables/<project-name>/04-draft-deliverable/deck-draft.md` for deck content
- `deliverables/<project-name>/04-draft-deliverable/workbook-draft.md` for workbook architecture and formulas
- `deliverables/<project-name>/04-draft-deliverable/document-draft.md` for document content

If the requested final format is PPTX, XLSX, DOCX, or PDF, create the source-grounded draft first, then create the binary/export after evidence mapping and hostile review unless the user explicitly asks for an earlier preview.

## Stage 4: Evidence Map

Use `prompts/05-evidence-map.md`.

Produce:

- `deliverables/<project-name>/05-evidence-map/evidence-map.json`

Then run:

```bash
node scripts/validate-evidence-map.js deliverables/<project-name>/05-evidence-map/evidence-map.json
```

## Stage 5: Hostile Review

Use `prompts/06-pretty-but-wrong-review.md`.

Produce:

- `deliverables/<project-name>/06-hostile-review/review-report.md`

Rules:

- Enumerate issues.
- Do not rewrite, beautify, or silently fix the artifact.
- Call out unsupported claims, stale numbers, hardcoded outputs, formula drift, untraceable charts, and assumptions presented as facts.

## Stage 6: Final Deliverable Output

Create the final deliverable only after the hostile review is complete and blocking issues are resolved or explicitly accepted by the user.

Produce the requested final output in `deliverables/<project-name>/07-final-deliverable/`.

Use the clearest filename:

- `07-final-deliverable/final-deliverable.md`
- `07-final-deliverable/final-deck.md`
- `07-final-deliverable/final-workbook.md`
- `07-final-deliverable/final-document.md`
- or the requested binary/export name, such as `final-deck.pptx`, `final-workbook.xlsx`, `final-document.docx`, or `final-report.pdf`

Also produce:

- `deliverables/<project-name>/07-final-deliverable/final-readme.md`

The final README must list:

- final deliverable file
- source packet
- file spec
- evidence map
- review report
- unresolved or user-accepted risks
- validation commands run, for audit detail only

## Closeout

End with a short user-facing closeout. Do not print raw validation commands in the chat closeout unless the user asks for them. Say whether validation passed or failed in plain English.

Include:

- final deliverable path
- support files created
- validation status, such as "Validation passed for setup check, source packet, and evidence map"
- issues requiring human review
- unresolved or accepted risks
