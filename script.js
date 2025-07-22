#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Read config file
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const projectName = config.projectName;

if (!projectName) {
  console.error("⚠️  Please inform the project name in config.json");
  process.exit(1);
}

const run = (cmd) => execSync(cmd, { stdio: "inherit" });

console.log(`🚀 Creating project: ${projectName}...\n`);
run(`npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --no-src-dir --app --import-alias="@/*" --no-turbopack`);

// Add project folder to .gitignore
console.log('📝 Updating .gitignore...');
fs.appendFileSync('.gitignore', `\n# Dynamic project folder\n${projectName}/\n`);

// Configure Tailwind in global files
const tailwindConfigPath = path.join(projectName, "tailwind.config.js");
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
fs.writeFileSync(tailwindConfigPath, tailwindConfig);

const globalsCssPath = path.join(projectName, "app", "globals.css");
const tailwindDirectives = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;
fs.writeFileSync(globalsCssPath, tailwindDirectives);

const pagesDir = path.join(projectName, "app");
const componentsDir = path.join(projectName, "components");

// Create directories
fs.mkdirSync(componentsDir, { recursive: true });

// ============================
// Create components by section
// ============================

const components = [
  "HeroSection",
  "SobrePromptSnippet",
  "Beneficios",
  "Depoimentos",
  "CTASection",
];

components.forEach((name) => {
  const filePath = path.join(componentsDir, `${name}.tsx`);
  fs.writeFileSync(
    filePath,
    `export default function ${name}() {
  return <section><p>Section: ${name}</p></section>;
}
`
  );
});

// ============================
// Home page app/page.tsx
// ============================

const pagePath = path.join(pagesDir, "page.tsx");

const content = `import HeroSection from "../components/HeroSection";
import SobrePromptSnippet from "../components/SobrePromptSnippet";
import Beneficios from "../components/Beneficios";
import Depoimentos from "../components/Depoimentos";
import CTASection from "../components/CTASection";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: '${config.metaDataTitle}',
  description: '${config.metaDataDescription}',
  robots: '${config.metaDataRobots}',
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SobrePromptSnippet />
      <Beneficios />
      <Depoimentos />
      <CTASection />
    </main>
  );
}
`;

fs.writeFileSync(pagePath, content);

console.log(`✅ Project ${projectName} created successfully.\n`);

console.log('🏃‍♀️‍➡️ Running project...');
run(`cd ${projectName} && npm run dev`)
