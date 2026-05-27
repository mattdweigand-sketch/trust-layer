# Trust Layer

Trust Layer is a portable workflow for making AI-assisted deliverables inspectable.

It helps teams create source-grounded decks, memos, workbook reviews, questionnaires, diligence summaries, and operating reports without losing track of where the facts came from.

```text
Truth layer first. Artifact second.
```

## What It Produces

A Trust Layer run creates an audit trail before the final artifact is shared:

- setup check
- source packet
- file specification
- draft deliverable
- evidence map
- hostile review
- final deliverable

The output folder is intentionally boring:

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

## Why It Matters

Polished artifacts can still be wrong.

Trust Layer is designed to catch common failure modes:

- unsupported claims
- stale numbers
- hardcoded workbook outputs
- assumptions presented as facts
- untraceable charts
- unresolved source conflicts
- review theater

## Start Here

Install dependencies:

```bash
npm install
```

Validate the examples:

```bash
npm test
```

Start a guided run:

```bash
npm run setup
```

## Learn More

- [Workflow](workflow.md)
- [Concepts](concepts.md)
- [Office Risk Taxonomy](office-risk-taxonomy.md)
- [Intake Template](workflow-templates/intake.md)
- [GitHub Repository](https://github.com/mattdweigand-sketch/trust-layer)
