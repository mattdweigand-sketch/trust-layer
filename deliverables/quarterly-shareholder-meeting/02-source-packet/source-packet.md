# Source Packet: Quarterly Shareholder Meeting Memo

Created: 2026-05-27  
Artifact goal: Board memo for quarterly shareholder meeting  
Setup: `deliverables/quarterly-shareholder-meeting/01-setup-check/setup-check.md`

## Source Inventory

| ID | Source | Owner | Date | Status | Authority | Currentness |
|---|---|---|---|---|---|---|
| S01 | Q1 2026 Financial Export | Finance | 2026-04-07 | current | primary | current |
| S02 | CFO Forecast Notes | Priya Shah, CFO | 2026-04-12 | current | secondary | current |
| S03 | Prior Board Deck Summary | Strategy | 2026-01-18 | superseded | background | stale |
| S04 | Revenue Ops Meeting Transcript | Revenue Operations | 2026-04-10 | transcript | secondary | current |
| S05 | Customer Pipeline Export | Revenue Operations | 2026-04-09 | raw_data | primary | current |

## Authority Map

Use S01 as the primary source for Q1 actuals. Use S05 as the primary source for opportunity-level pipeline data. Use S02 for forecast assumptions and CFO risk framing, but not as the final source for actuals where it conflicts with S01. Use S04 for qualitative pipeline and risk context. Use S03 only for plan-versus-actual context because it is superseded.

## Confirmed Facts

- S01 reports Q1 2026 ARR of `$48.2M`.
- S01 reports Q1 2026 revenue of `$11.8M`.
- S01 reports Q1 2026 gross margin of `74%`.
- S01 reports Q1 2026 net revenue retention of `118%`.
- S01 reports Q1 2026 logo churn of `3.8%`.
- S01 reports Q1 2026 cash balance of `$28.4M`.
- S01 reports Q1 2026 burn multiple of `1.7x`.
- S01 reports Q1 2026 enterprise ARR of `$29.1M`.
- S03 is stale for current actuals and should be used only for January plan comparison.
- S04 says the CRM export should be the system of record for opportunity stage and amount.
- S05 lists Atlas Manufacturing as a `$1.4M` Q2 enterprise opportunity in Legal Review and Commit.

## Open Assumptions

- Q2 new ARR forecast is `$4.2M`. Source: S02. Owner: CFO.
- Enterprise expansion is expected to contribute `55%` of Q2 new ARR. Source: S02. Owner: CFO.
- Gross margin is expected to improve to `76%` by Q3 if services utilization holds. Source: S02. Owner: CFO.
- Burn multiple should remain below `1.8x` through Q3. Source: S02. Owner: CFO.
- The forecast assumes no material churn increase in May or June. Source: S02. Owner: CFO.

## Conflict Log

### C01: ARR For Board Memo

S01 reports Q1 ARR of `$48.2M`. S02 says the May board update should show ARR at `$49.1M`, but also says Finance needs to reconcile this before publishing.

Status: open  
Decision required: yes  
User decision: Keep unresolved until Finance reconciles. Do not present a final ARR figure as confirmed.

### C02: Q2 Pipeline Coverage

S02 uses `3.4x` pipeline coverage. S04 says coverage is around `3.3x` including late-stage enterprise expansion and closer to `2.4x` without those expansion opportunities. S04 also includes an action item for RevOps to confirm whether `3.3x` or `3.4x` should be reported.

Status: resolved  
Decision required: yes  
User decision: Use a range for Q2 pipeline coverage.

### C03: Enterprise Expansion Framing

S02 says upside came mostly from enterprise expansion and expects enterprise expansion to contribute `55%` of Q2 new ARR. S04 says enterprise expansion should not be presented as guaranteed unless Legal clears two renewal blockers. S05 shows Atlas Manufacturing as a large `$1.4M` opportunity still in Legal Review.

Status: resolved  
Decision required: yes  
User decision: Frame enterprise expansion as both upside and risk.

## Missing Context

- Finance decision on whether to use `$48.2M` or `$49.1M` ARR. User instruction is to wait until resolved.
- RevOps decision on whether pipeline coverage should be `3.3x`, `3.4x`, or a range.
- CFO / RevOps decision on whether enterprise expansion should be framed as upside, risk, or both.
- Legal update on the two enterprise renewal blockers after the April 19 action item.

## Stop Point

This source packet is approved for memo specification with one unresolved ARR item. The memo must not present final ARR as confirmed until Finance reconciliation is complete.
