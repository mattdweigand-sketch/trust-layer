import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const pipedAnswers = input.isTTY ? [] : readFileSync(0, "utf8").split(/\r?\n/);
const rl = input.isTTY ? createInterface({ input, output }) : null;

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function section(title) {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
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

async function askRequired(label) {
  const answer = await ask(label);
  if (!answer) {
    throw new Error(`Missing required input: ${label}`);
  }
  return answer;
}

function runValidation() {
  section("Step 1: Validate the kit");
  console.log("Checking the built-in examples so you know the repo is working.");

  const result = spawnSync("npm", ["test"], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error("Validation failed. Fix the reported issue, then run setup again.");
  }
}

function explainWorkflow() {
  section("Step 2: Understand the workflow");
  console.log("Trust Layer works in gates:");
  console.log("0. Setup check: confirm the goal, sources, output folder, final format, reviewer, and approvals.");
  console.log("1. Source packet: list what the sources say, with IDs like S01 and S02.");
  console.log("2. File spec: decide the artifact structure before writing or formatting.");
  console.log("3. Draft deliverable: create the deck, workbook, memo, or review only after approval.");
  console.log("4. Evidence map: connect important claims back to source IDs.");
  console.log("5. Hostile review: look for unsupported claims, stale data, and hidden assumptions.");
  console.log("6. Final deliverable: produce the final output after review issues are resolved or accepted.");
  console.log("\nThe rule is: truth layer first, artifact second.");
}

async function collectIntake() {
  section("Step 3: Start a Trust Layer run");
  console.log("Answer these once. Setup will create the starter files in deliverables/.");

  const artifactType = await askRequired("Artifact type");
  const audience = await askRequired("Audience");
  const useCase = await askRequired("Decision or use case");
  const finalFormat = await ask("Final format needed", artifactType);
  const sources = await askRequired("Source files or folder");
  const reviewer = await ask("Human reviewer or owner", "TBD");
  const deadline = await ask("Deadline", "TBD");
  const projectName = await ask(
    "Project name",
    slugify(useCase || artifactType || "trust-layer-run")
  );

  return {
    artifactType,
    audience,
    useCase,
    finalFormat,
    sources,
    reviewer,
    deadline,
    projectName,
  };
}

async function writeIntakeFiles(intakeAnswers) {
  const {
    artifactType,
    audience,
    useCase,
    finalFormat,
    sources,
    reviewer,
    deadline,
    projectName,
  } = intakeAnswers;

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

- None captured during setup.
`;

  const intake = `# Trust Layer Intake

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

Run the Trust Layer workflow for this artifact.

Use .Codex/commands/trust-layer.md as the operating procedure.
Start with the setup check in ${outputDir}/01-setup-check/setup-check.md.
Do not analyze sources until the setup check is ready.
Do not create the final artifact until I approve the source packet, file spec, and hostile review.
Save outputs under ${outputDir}/.
Stop and ask me before resolving decision-critical conflicts.
`;

  const nextPrompt = `Run the Trust Layer workflow for this artifact.

Use .Codex/commands/trust-layer.md as the operating procedure.
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

  return outputDir;
}

try {
  section("Trust Layer setup");
  console.log("This command validates the kit, explains the gates, and creates a guided run.");

  runValidation();
  explainWorkflow();
  const intakeAnswers = await collectIntake();
  const outputDir = await writeIntakeFiles(intakeAnswers);

  section("Step 4: Workflow ready");
  console.log(`Created ${outputDir}/01-setup-check/setup-check.md`);
  console.log(`Created ${outputDir}/01-setup-check/intake.md`);
  console.log(`Created ${outputDir}/01-setup-check/next-prompt.txt`);
  console.log("\nSetup is ready. In a repo-tied chat, continue automatically from Stage 0 using the generated setup files.");
  console.log("The workflow should stop only for approval gates, blocking questions, or unresolved decision-critical conflicts.");
} catch (error) {
  console.error(`\nSetup stopped: ${error.message}`);
  process.exitCode = 1;
} finally {
  rl?.close();
}
