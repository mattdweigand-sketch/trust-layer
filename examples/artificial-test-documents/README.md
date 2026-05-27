# Artificial Test Documents

Use these files to test the Evidence Map workflow.

Point a repo-tied chat at this folder and say:

```text
Run the Evidence Map workflow.
Use .Codex/commands/evidence-map.md.
Use examples/artificial-test-documents as the source folder.
The target artifact is a 5-slide board update deck for the May 2026 board meeting.
Start with the source packet and stop before the file spec.
```

## Files

- `S01-financial-export-q1-2026.csv` — primary financial export
- `S02-cfo-forecast-notes.md` — CFO forecast notes with assumptions
- `S03-prior-board-deck-summary.md` — prior deck summary with stale data
- `S04-revenue-ops-meeting-transcript.md` — transcript with qualitative evidence
- `S05-customer-pipeline-export.csv` — pipeline export with current quarter pipeline data

## Intentional Issues

- ARR differs between the financial export and CFO notes.
- The prior board deck contains stale January numbers.
- Pipeline coverage is strong, but enterprise conversion assumptions are not approved.
- Expansion revenue is described as both the main upside case and a concentration risk.
