#!/usr/bin/env node
import fs from 'node:fs'

const file = process.argv[2]
if (!file) {
  console.error('Usage: node scripts/validate-setup-check.js <setup-check.md>')
  process.exit(2)
}

let text
try {
  text = fs.readFileSync(file, 'utf8')
} catch (err) {
  console.error(`Cannot read ${file}: ${err.message}`)
  process.exit(1)
}

const errors = []
const status = readField(text, 'Setup status')
if (!status) errors.push('Setup status is required')
if (status && !['ready', 'blocked'].includes(status.toLowerCase())) {
  errors.push('Setup status must be ready or blocked')
}

for (const field of [
  'Artifact type',
  'Intended audience',
  'Decision or use case',
  'Sources',
  'Output folder',
  'Final format',
  'Human reviewer',
]) {
  if (!readField(text, field)) errors.push(`${field} is required`)
}

if (!/Source packet approval required:\s*yes/i.test(text)) {
  errors.push('Source packet approval gate is required')
}
if (!/File specification approval required:\s*yes/i.test(text)) {
  errors.push('File specification approval gate is required')
}
if (!/Hostile review approval required before final output:\s*yes/i.test(text)) {
  errors.push('Hostile review approval gate is required')
}

if (errors.length > 0) {
  console.error(`FAIL ${file}`)
  for (const error of errors) console.error(`- ${error}`)
  process.exit(1)
}

console.log(`PASS ${file}`)

function readField(source, label) {
  const escaped = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const match = source.match(new RegExp(`(?:^|\\n)(?:-\\s*)?${escaped}:\\s*(.+)`))
  return match?.[1]?.trim() ?? ''
}
