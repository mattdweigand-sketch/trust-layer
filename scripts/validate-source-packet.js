#!/usr/bin/env node
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/validate-source-packet.js <source-packet.json>')
  process.exit(2)
}

const packet = readJson(file)
const errors = []

required(packet, 'packet_id', errors)
required(packet, 'created_at', errors)
required(packet, 'artifact_goal', errors)
if (!Array.isArray(packet.sources) || packet.sources.length === 0) {
  errors.push('sources must be a non-empty array')
}

const sourceIds = new Set()
for (const [i, source] of (packet.sources ?? []).entries()) {
  const prefix = `sources[${i}]`
  for (const field of ['source_id', 'title', 'date', 'owner', 'type', 'status', 'authority', 'currentness']) {
    required(source, `${prefix}.${field}`, errors, field)
  }
  if (source.source_id && !/^S[0-9]{2,}$/.test(source.source_id)) {
    errors.push(`${prefix}.source_id must look like S01`)
  }
  if (sourceIds.has(source.source_id)) errors.push(`${prefix}.source_id duplicates ${source.source_id}`)
  sourceIds.add(source.source_id)
}

for (const [i, conflict] of (packet.conflicts ?? []).entries()) {
  const prefix = `conflicts[${i}]`
  for (const id of conflict.source_ids ?? []) {
    if (!sourceIds.has(id)) errors.push(`${prefix}.source_ids references unknown ${id}`)
  }
  if (conflict.decision_required === true && conflict.status === 'resolved' && !conflict.resolution) {
    errors.push(`${prefix} is resolved but has no resolution`)
  }
}

for (const [i, assumption] of (packet.assumptions ?? []).entries()) {
  const prefix = `assumptions[${i}]`
  if (assumption.status !== 'approved' && assumption.confidence === 'high') {
    errors.push(`${prefix} has high confidence but is not approved`)
  }
  for (const id of assumption.source_ids ?? []) {
    if (!sourceIds.has(id)) errors.push(`${prefix}.source_ids references unknown ${id}`)
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
