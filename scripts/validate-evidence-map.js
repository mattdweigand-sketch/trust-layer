#!/usr/bin/env node
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/validate-evidence-map.js <evidence-map.json>')
  process.exit(2)
}

const map = readJson(file)
const errors = []

required(map, 'artifact_id', errors)
required(map, 'created_at', errors)
if (!Array.isArray(map.items) || map.items.length === 0) {
  errors.push('items must be a non-empty array')
}

const targetIds = new Set()
for (const [i, item] of (map.items ?? []).entries()) {
  const prefix = `items[${i}]`
  for (const field of ['target_id', 'artifact_location', 'claim_or_value', 'source_date', 'owner', 'confidence', 'review_status']) {
    required(item, `${prefix}.${field}`, errors, field)
  }
  if (!Array.isArray(item.source_ids) || item.source_ids.length === 0) {
    errors.push(`${prefix}.source_ids must be non-empty`)
  }
  if (targetIds.has(item.target_id)) errors.push(`${prefix}.target_id duplicates ${item.target_id}`)
  targetIds.add(item.target_id)
  if (item.assumption_flag === true && item.review_status === 'reviewed') {
    errors.push(`${prefix} is an assumption but marked reviewed; use needs_human unless a human approved it`)
  }
  if (/\b\d{4}\b|\$|%|\b\d+x\b/i.test(item.claim_or_value) && item.source_date === 'unknown') {
    errors.push(`${prefix} contains a number but source_date is unknown`)
  }
}

finish(file, errors)

function readJson(path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf8'))
  } catch (err) {
    console.error(`Invalid JSON: ${path}: ${err.message}`)
    process.exit(1)
  }
}

function required(obj, display, errors, key = display) {
  if (obj?.[key] === undefined || obj?.[key] === null || obj?.[key] === '') {
    errors.push(`${display} is required`)
  }
}

function finish(path, errors) {
  if (errors.length > 0) {
    console.error(`FAIL ${path}`)
    for (const error of errors) console.error(`- ${error}`)
    process.exit(1)
  }
  console.log(`PASS ${path}`)
}
