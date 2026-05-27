# File Specification: Quarterly Shareholder Meeting Memo

Created: 2026-05-27  
Artifact type: memo  
Audience: board  
Decision or use case: quarterly shareholder meeting  
Final format: memo  
Source packet: `deliverables/quarterly-shareholder-meeting/02-source-packet/source-packet.md`

## Approval Status

Status: draft  
Approval required before drafting memo: yes

## Purpose

Create a board-ready memo that summarizes Q1 performance, Q2 outlook, and enterprise expansion risk for the quarterly shareholder meeting.

## Narrative Spine

Q1 performance was ahead of the January plan, but the Q2 outlook depends on enterprise expansion opportunities that should be presented as both upside and concentration risk.

## Required Memo Sections

### 1. Executive Summary

Purpose: Give the board the current operating picture in plain language.

Required claims:

- Q1 actuals were ahead of the January plan. Sources: S01, S03.
- Enterprise expansion is the main upside case, but should not be treated as guaranteed. Sources: S02, S04, S05.
- ARR remains pending Finance reconciliation and should not be presented as final. Sources: S01, S02.

Review status: needs_human for ARR language.

### 2. Q1 Actuals

Purpose: Present source-grounded actuals from Finance.

Allowed metrics:

- Revenue: `$11.8M`. Source: S01.
- Gross margin: `74%`. Source: S01.
- Net revenue retention: `118%`. Source: S01.
- Logo churn: `3.8%`. Source: S01.
- Cash balance: `$28.4M`. Source: S01.
- Burn multiple: `1.7x`. Source: S01.
- Enterprise ARR: `$29.1M`. Source: S01.

ARR rule:

- Do not state final company ARR as confirmed.
- If ARR is mentioned, write: "Finance close shows `$48.2M`; CFO planning notes reference `$49.1M`; final board ARR is pending Finance reconciliation."

Review status: needs_human.

### 3. Q2 Outlook

Purpose: Describe forecast expectations without overstating assumptions.

Allowed claims:

- Q2 new ARR forecast is `$4.2M`. Source: S02. Mark as forecast assumption.
- Gross margin is expected to improve to `76%` by Q3 if services utilization holds. Source: S02. Mark as assumption.
- Burn multiple is expected to remain below `1.8x` through Q3. Source: S02. Mark as assumption.
- Q2 pipeline coverage should be presented as a range, not a single point estimate. Sources: S02, S04.

Pipeline language:

- Use: "Q2 pipeline coverage is roughly `3.3x` to `3.4x` including late-stage enterprise expansion, and closer to `2.4x` without those expansion opportunities."

Review status: needs_human for forecast assumptions.

### 4. Enterprise Expansion: Upside And Risk

Purpose: Reflect the user's decision to frame enterprise expansion as both upside and risk.

Required claims:

- Enterprise expansion is expected to contribute materially to Q2 new ARR. Source: S02.
- Expansion revenue is concentrated in four enterprise accounts. Source: S02.
- Atlas Manufacturing is a `$1.4M` Q2 enterprise opportunity in Legal Review and Commit forecast category. Source: S05.
- CFO guidance says not to present enterprise expansion as guaranteed unless Legal clears two renewal blockers. Source: S04.

Review status: needs_human until Legal renewal status is updated or accepted as unresolved.

### 5. Decisions And Open Items For Board Awareness

Purpose: Make unresolved items visible rather than burying them in prose.

Required open items:

- ARR reconciliation between S01 `$48.2M` and S02 `$49.1M`.
- Legal update on two enterprise renewal blockers.
- Confirmation of whether Atlas Manufacturing is included in the base forecast or only upside case.
- Final owner approval for Q2 pipeline coverage range.

Review status: blocked for final memo if user wants all unresolved items removed before delivery.

## Evidence Requirements

Every material claim in the draft memo must map to at least one source ID.

Required source handling:

- S01 is the authority for Q1 actuals.
- S05 is the authority for opportunity-level pipeline details.
- S02 is the authority for CFO forecast assumptions and risk framing.
- S04 is the authority for RevOps qualitative context and pipeline caveats.
- S03 may be used only for January plan comparison, not current actuals.

## Unsupported Claims To Avoid

- Do not say ARR is definitively `$49.1M`.
- Do not say ARR is definitively `$48.2M` without noting reconciliation if using company ARR in board-facing language.
- Do not say Q2 pipeline coverage is exactly `3.4x`.
- Do not present enterprise expansion as guaranteed.
- Do not state Legal has cleared renewal blockers.
- Do not use January deck figures as current actuals.

## Draft Output

Next file to create after approval:

`deliverables/quarterly-shareholder-meeting/04-draft-deliverable/draft-deliverable.md`

## Approval Gate

Approve this file specification before drafting the memo.
