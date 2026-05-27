# Workflow

## Repo-Tied Chat Usage

Use `.Codex/commands/trust-layer.md` when a chat session should conduct the workflow.

The command turns the prompt set into a staged process:

1. setup check
2. source packet
3. file specification
4. draft deliverable
5. evidence map
6. hostile review
7. final deliverable output

Use `docs/workflow-templates/intake.md` to capture the artifact goal, audience, source files, constraints, and review owner before starting.

Do not skip the setup check. It is the gate that confirms the workflow has enough information to produce a final deliverable.

After setup succeeds, continue automatically. Do not ask the user to paste `next-prompt.txt`; read the generated setup files and proceed until an approval gate or blocking question requires user input.

## Deliverable Folder Structure

Each deliverable should be audit-friendly:

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

Confirm:

- artifact type
- intended audience
- decision or use case
- source files or source folder
- output folder
- final format
- human reviewer
- approval gates

If any required field is missing, stop and ask before reading sources.

## Stage 1: Source Prep

Create a source packet before creating the artifact.

Capture:

- source ID
- title
- owner
- date
- type
- status
- authority
- currentness
- relevant facts
- assumptions
- conflicts
- missing context

Do not write slide headlines, formulas, or final prose yet.

## Stage 2: Structure

Create the file specification.

For decks, define:

- audience
- decision context
- one-sentence narrative spine
- slide list
- claim headlines
- source IDs per claim
- assumptions
- open questions

For workbooks, define:

- purpose
- user
- tab architecture
- raw data fields
- assumptions
- calculation flow
- outputs
- checks

## Stage 3: Draft Creation

Generate the artifact only after source prep and structure are complete.

The model may render slides, formulas, tables, charts, and prose, but it should not invent the argument while formatting the file.

## Stage 4: Evidence Map

Map every important claim, number, chart, table, workbook cell, or document paragraph back to source IDs.

Validate the evidence map:

```bash
node scripts/validate-evidence-map.js deliverables/<project-name>/05-evidence-map/evidence-map.json
```

## Stage 5: Hostile Review

Run a hostile review.

Check:

- unsupported claims
- numbers without source, date, or owner
- stale sources
- formulas copied inconsistently
- hardcoded outputs
- untraceable charts
- assumptions presented as facts
- missing speaker-note evidence

The review report should enumerate issues and require human judgment for consequential claims.

## Stage 6: Final Deliverable

Create the final deliverable only after hostile review.

If blocking issues remain, the user must either resolve them or explicitly accept the risk. Save the final output and a `final-readme.md` in `07-final-deliverable/` that points to the source packet, file spec, evidence map, review report, and unresolved risks.

In the chat closeout, summarize validation status in plain English. Keep raw validation commands in `final-readme.md` for audit detail.
