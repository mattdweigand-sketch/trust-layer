import { readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";

const pipedAnswers = input.isTTY ? [] : readFileSync(0, "utf8").split(/\r?\n/);
const rl = input.isTTY ? createInterface({ input, output }) : null;

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function stagePath(outputDir, stage, file) {
  return path.join(outputDir, stage, file);
}

async function ask(label, fallback = "") {
  const suffix = fallback ? ` (${fallback})` : "";
  if (!rl) {
    const answer = pipedAnswers.shift()?.trim() || fallback;
    console.log(`${label}${suffix}: ${answer}`);
    return answer;
  }

  const answer = await rl.question(`${label}${suffix}: `);
  return answer.trim() || fallback;
}

const artifactType = await ask("Artifact type");
const audience = await ask("Audience");
const useCase = await ask("Decision or use case");
const finalFormat = await ask("Final format needed", artifactType);
const sources = await ask("Source files or folder");
const reviewer = await ask("Human reviewer or owner", "TBD");
const deadline = await ask("Deadline", "TBD");
const projectName = await ask("Project name", slugify(useCase || artifactType || "evidence-map-run"));

rl?.close();

if (!artifactType || !audience || !useCase || !sources) {
  console.error("\nMissing required input. Provide artifact type, audience, use case, and sources.");
  process.exit(1);
}

const projectSlug = slugify(projectName);
const outputDir = path.join("deliverables", projectSlug);
const stages = [
  "01-setup-check",
  "02-source-packet",
  "03-file-specification",
  "04-draft-deliverable",
  "05-evidence-map",
  "06-hostile-review",
  "07-final-deliverable",
];
for (const stage of stages) {
  await mkdir(path.join(outputDir, stage), { recursive: true });
}

const setupCheck = `# Deliverable Setup Check

Setup status: ready

## Required Fields

- Artifact type: ${artifactType}
- Intended audience: ${audience}
- Decision or use case: ${useCase}
- Sources: ${sources}
- Output folder: ${outputDir}
- Final format: ${finalFormat}
- Deadline: ${deadline}
- Human reviewer: ${reviewer}

## Approval Gates

- Source packet approval required: yes
- File specification approval required: yes
- Hostile review approval required before final output: yes

## Blocking Questions

- None captured during kickoff.
`;

const intake = `# Evidence Map Intake

## Artifact Goal

- Artifact type: ${artifactType}
- Intended audience: ${audience}
- Decision or use case: ${useCase}
- Final format needed: ${finalFormat}
- Output folder: ${outputDir}
- Deadline: ${deadline}
- Human reviewer or owner: ${reviewer}
- Approval gates: source packet, file spec, hostile review

## Sources

${sources}

## Known Constraints

- Must include:
- Must avoid:
- Known stale sources:
- Known conflicts:
- Assumptions already approved:

## Workflow Request

Run the Evidence Map workflow for this artifact.

Use .Codex/commands/evidence-map.md as the operating procedure.
Start with the setup check in ${outputDir}/01-setup-check/setup-check.md.
Do not analyze sources until the setup check is ready.
Do not create the final artifact until I approve the source packet, file spec, and hostile review.
Save outputs under ${outputDir}/.
Stop and ask me before resolving decision-critical conflicts.
`;

const nextPrompt = `Run the Evidence Map workflow for this artifact.

Use .Codex/commands/evidence-map.md as the operating procedure.
Use ${outputDir}/01-setup-check/setup-check.md as the setup check.
Use ${outputDir}/01-setup-check/intake.md as the intake.
Start at Stage 0 and confirm the setup check is ready before analyzing sources.
Walk me through every stage to the final deliverable output.
Do not create the final artifact until I approve the source packet, file spec, and hostile review.
Save outputs under ${outputDir}/.
Stop and ask me before resolving decision-critical conflicts.
This file is an audit artifact. The repo-tied chat should continue from it automatically after setup.
`;

await writeFile(stagePath(outputDir, "01-setup-check", "setup-check.md"), setupCheck);
await writeFile(stagePath(outputDir, "01-setup-check", "intake.md"), intake);
await writeFile(stagePath(outputDir, "01-setup-check", "next-prompt.txt"), nextPrompt);

console.log(`\nCreated ${outputDir}/01-setup-check/setup-check.md`);
console.log(`\nCreated ${outputDir}/01-setup-check/intake.md`);
console.log(`Created ${outputDir}/01-setup-check/next-prompt.txt`);
console.log("\nSetup is ready. In a repo-tied chat, continue automatically from Stage 0 using the generated setup files.");
