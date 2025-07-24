const fs = require("fs");
const path = require("path");

async function createComponents(projectName) {
  const componentsDir = path.join(projectName, "components");
  const pagesDir = path.join(projectName, "app");

  // Create section components
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

  // Create home page
  const pagePath = path.join(pagesDir, "page.tsx");
  const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

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
}

module.exports = { createComponents }; 