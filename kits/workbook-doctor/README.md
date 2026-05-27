# Workbook Doctor Kit

Use this kit for Excel workbooks that carry financial, operational, or decision-support numbers.

## Required Workbook Architecture

- `Raw_Data`: source-preserving input data
- `Assumptions`: all judgment calls, estimates, placeholders, and owner/date metadata
- `Calculations`: formulas and transformations
- `Outputs`: user-facing summaries
- `Checks`: pass/fail checks
- optional hidden `_Evidence`: cell-level source map

## Checks

- required tabs exist
- raw data is not mixed with calculations
- formulas are consistent across parallel rows and columns
- calculated outputs are not hardcoded
- date ranges are labeled
- assumptions have owner, source, and status
- charts map to source ranges

## Output

- workbook risk report
- formula issue list
- assumptions log
- missing evidence list
