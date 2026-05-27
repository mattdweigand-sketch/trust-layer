# Evidence Map Intake

Use this template when starting a new Evidence Map run.

The easiest way to create this file is:

```bash
npm run setup
```

If you already know the workflow and only want the intake files, use `npm run kickoff`.

## Artifact Goal

- Artifact type:
- Intended audience:
- Decision or use case:
- Final format needed:
- Output folder:
- Deadline:
- Human reviewer or owner:
- Approval gates:

## Setup Check

- Setup status: blocked
- Required fields complete:
- Sources accessible:
- Final format clear:
- Output folder created:
- Human reviewer named:
- Blocking questions:

## Sources

List files, folders, links, notes, transcripts, exports, or prior artifacts.

```text
S01:
S02:
S03:
```

## Known Constraints

- Must include:
- Must avoid:
- Known stale sources:
- Known conflicts:
- Assumptions already approved:

## Workflow Request

The repo-tied chat should run this automatically after setup:

```text
Run the Evidence Map workflow for this artifact.

Use .Codex/commands/evidence-map.md as the operating procedure.
Start with the setup check.
Do not analyze sources until the setup check is ready.
Do not create the final artifact until I approve the source packet, file spec, and hostile review.
Save outputs under deliverables/<project-name>/.
Stop and ask me before resolving decision-critical conflicts.
Use numbered stage folders for auditability.
```
