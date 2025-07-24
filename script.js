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
run(`npx create-next-app@latest ${projectName} --typescript --tailwind --eslint --no-src-dir --app --import-alias="@/*" --no-turbopack -y`);

// Add project folder to .gitignore
console.log('📝 Updating .gitignore...');
fs.appendFileSync('.gitignore', `\n# Dynamic project folder\n${projectName}/\n`);

// Install and initialize shadcn/ui
console.log('\n🎨 Installing shadcn/ui and its dependencies...');
run(`cd ${projectName} && npx shadcn@latest init -y --base-color=neutral`);

// Add some commonly used shadcn components
console.log('\n📦 Adding commonly used shadcn components...');
const shadcnComponents = [
  "button",
  "carousel"
];

shadcnComponents.forEach(component => {
  console.log(`Adding ${component} component...`);
  run(`cd ${projectName} && npx shadcn@latest add ${component} --yes`);
});

// Configure Tailwind in global files
const tailwindConfigPath = path.join(projectName, "tailwind.config.js");
const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './components/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
`;
fs.writeFileSync(tailwindConfigPath, tailwindConfig);

const globalsCssPath = path.join(projectName, "app", "globals.css");
const tailwindDirectives = `@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);
}

.dark {
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

fs.writeFileSync(globalsCssPath, tailwindDirectives);

const pagesDir = path.join(projectName, "app");
const componentsDir = path.join(projectName, "components");

// Create directories
fs.mkdirSync(componentsDir, { recursive: true });

// Install next-themes
console.log('\n📦 Installing next-themes...');
run(`cd ${projectName} && npm install next-themes`);

// Create theme provider
console.log('\n📦 Creating theme provider...');
const themeProviderPath = path.join(componentsDir, "theme-provider.tsx");
const themeProviderContent = `"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
`;
fs.writeFileSync(themeProviderPath, themeProviderContent);

// Update layout to use theme provider and set dark theme
const layoutPath = path.join(pagesDir, "layout.tsx");
const layoutContent = `import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
`;
fs.writeFileSync(layoutPath, layoutContent);

// ============================
// Create components by section
// ============================

const components = [
  "HeroSection",
  "AboutSection",
  "BenefitsSection",
  "GuaranteeSection",
  "FAQSection",
  "CTASection",
  "CopyrightSection"
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
import AboutSection from "../components/AboutSection";
import BenefitsSection from "../components/BenefitsSection";
import GuaranteeSection from "../components/GuaranteeSection";
import FAQSection from "../components/FAQSection";
import CTASection from "../components/CTASection";
import CopyrightSection from "../components/CopyrightSection";

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
      <AboutSection />
      <BenefitsSection />
      <GuaranteeSection />
      <FAQSection />
      <CTASection />
      <CopyrightSection />
    </main>
  );
}
`;

fs.writeFileSync(pagePath, content);

console.log(`✅ Project ${projectName} created successfully.\n`);

console.log('🏃‍♀️‍➡️ Running project...');
run(`cd ${projectName} && npm run dev`)
