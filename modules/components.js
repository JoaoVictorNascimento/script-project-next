const fs = require("fs");
const path = require("path");
const sections = require("./sections");

async function createComponents(projectName) {
  const componentsDir = path.join(projectName, "components");
  const pagesDir = path.join(projectName, "app");
  const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

  // Create components sections
  const components = {
    "HeroSection": sections.getHeroSection(config),
    "AboutSection": sections.getAboutSection(config),
    "BenefitsSection": sections.getBenefitsSection(config),
    "GuaranteeSection": sections.getGuaranteeSection(config),
    "FAQSection": sections.getFAQSection(config),
    "CTASection": sections.getCTASection(config),
    "CopyrightSection": sections.getCopyrightSection(config)
  };

  // Create each component
  Object.entries(components).forEach(([name, content]) => {
    const filePath = path.join(componentsDir, `${name}.tsx`);
    fs.writeFileSync(filePath, content);
  });

  // Create layout with custom font
  const layoutPath = path.join(pagesDir, "layout.tsx");
  fs.writeFileSync(layoutPath, sections.getLayout());

  // Create home page
  const pagePath = path.join(pagesDir, "page.tsx");
  const pageContent = `import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { BenefitsSection } from "../components/BenefitsSection";
import { GuaranteeSection } from "../components/GuaranteeSection";
import { FAQSection } from "../components/FAQSection";
import { CTASection } from "../components/CTASection";
import { CopyrightSection } from "../components/CopyrightSection";

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
}`;

  fs.writeFileSync(pagePath, pageContent);
}

module.exports = { createComponents }; 