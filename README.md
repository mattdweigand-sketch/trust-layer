# Trust Layer

Trust Layer helps you use AI to create important work artifacts without losing track of where the facts came from.

Use it when you have a folder of source material and need to produce something polished, such as:

- an executive memo
- a board or leadership deck
- a workbook review
- a diligence summary
- an operating review
- a questionnaire response
- a status update
- a review report

The basic rule:

```text
Truth layer first. Artifact second.
```

That means the AI should not jump straight to the final memo, deck, or workbook. It should first identify the sources, facts, assumptions, conflicts, and open questions.

## How To Use It

Start a chat connected to this repo and provide your source files or source folder.

Ask the chat:

```text
Run the Trust Layer workflow for this deliverable.
```

The chat should then walk you through the process. It will ask what you are trying to create, who the audience is, where the source files are, and what final format you want.

After that, the workflow should continue automatically. You should not need to copy prompts manually from file to file.

## What The Workflow Does

Each deliverable moves through seven stages:

1. Setup check: confirms the goal, audience, source files, owner, output folder, and approval gates.
2. Source packet: lists the source materials and separates facts, assumptions, conflicts, and missing context.
3. File specification: plans the deliverable before drafting it.
4. Draft deliverable: creates the first version from the approved source packet and file spec.
5. Evidence map: connects each important claim, number, chart, table, or answer back to source IDs.
6. Hostile review: checks for unsupported claims, stale numbers, hidden assumptions, and unresolved conflicts.
7. Final deliverable output: creates the final version and records any accepted risks.

## Where The Work Goes

Every run is saved under `deliverables/<project-name>/`.

Inside that folder, each stage has its own numbered folder:

```text
01-setup-check/
02-source-packet/
03-file-specification/
04-draft-deliverable/
05-evidence-map/
06-hostile-review/
07-final-deliverable/
```

This makes it easy to audit the work later. You can open the folders in order and see how the final artifact was created.

## What Is In This Repo

This repo contains the reusable pieces that make the workflow work:

- `prompts/`: instructions the AI uses at each stage
- `schemas/`: rules for structured files like source packets and evidence maps
- `scripts/`: small checks that validate key files
- `kits/`: reusable guidance for decks, workbooks, evidence maps, and reviews
- `examples/`: small sample inputs and outputs
- `docs/`: deeper explanation of the workflow and risk types

## For Local Setup

If you are running this repo locally, install dependencies once:

```bash
npm install
```

To start a guided deliverable setup:

```bash
npm run setup
```

To check that the included examples are valid:

```bash
npm test
```

## Core Standard

Every important claim should show:

- where it came from
- when the source was created
- whether it is a fact, estimate, inference, or assumption
- who owns review
- whether it passed verification

The artifact is not done when it looks finished. It is done when the claims and calculations are inspectable.
