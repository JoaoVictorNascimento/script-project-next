#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Import modules
const { createComponents } = require("./modules/components");
const { setupTheme } = require("./modules/theme");
const { setupProject } = require("./modules/project");
const { readConfig } = require("./modules/config");

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

async function main() {
  try {
    // Read configuration
    const config = readConfig();
    const projectName = config.projectName;

    if (!projectName) {
      console.error("⚠️  Please inform the project name in config.json");
      process.exit(1);
    }

    // Setup Next.js project with dependencies
    await setupProject(projectName, run);

    // Setup theme configuration
    await setupTheme(projectName, run);

    // Create components
    await createComponents(projectName);

    console.log(`✅ Project ${projectName} created successfully.\n`);
    console.log('🏃‍♀️‍➡️ Running project...');
    run(`cd ${projectName} && npm run dev`);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

main();
