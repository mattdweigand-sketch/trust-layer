# Source Packet Kit

Use this kit before asking AI to create any Office artifact.

## Output

- `source-packet.json`
- `source-packet.md`

## Required Sections

1. Source inventory
2. Source authority map
3. Fact and assumption separation
4. Conflict log
5. Missing context
6. Human review decisions

## Source Status Values

- `current`
- `superseded`
- `background`
- `raw_data`
- `estimate`
- `transcript`
- `draft`
- `unknown`

## Stop Rule

If a conflict affects a decision-critical number, do not create the artifact until a human resolves it or labels it unresolved.
