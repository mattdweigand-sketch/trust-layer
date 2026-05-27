# Source Packet: Diligence Folder Example

## Artifact Goal

Create an operational diligence memo from a mixed source folder.

## Source Inventory

| ID | Source | Date | Owner | Status | Authority | Currentness |
|---|---|---:|---|---|---|---|
| S01 | Management KPI Export Q1 2026 | 2026-04-12 | Management | current | primary | current |
| S02 | Lender Presentation Draft | 2026-03-22 | Company | draft | secondary | stale |
| S03 | CFO Diligence Call Transcript | 2026-04-18 | Project Team | transcript | secondary | current |

## Conflict Log

| ID | Conflict | Sources | Status | Decision Required |
|---|---|---|---|---|
| C01 | S02 shows 2025 revenue at 42M while S01 shows 40.8M. | S01, S02 | open | yes |

## Assumptions

| ID | Assumption | Owner | Status | Confidence | Sources |
|---|---|---|---|---|---|
| A01 | Base-case churn remains flat through 2026. | Project Team | placeholder | medium | S03 |

## Open Questions

- Which 2025 revenue figure is approved for the diligence memo?
