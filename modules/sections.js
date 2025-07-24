function getHeroSection(config) {
  return `import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="text-center py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">${config.heroSection.headline}</h1>
      <p className="text-lg text-muted-foreground mb-6">
        ${config.heroSection.subheadline}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button className="text-lg px-8 py-6">${config.heroSection.ctaText}</Button>
        <span className="text-sm text-destructive font-medium">
          ${config.heroSection.urgencyText}
        </span>
      </div>
    </section>
  );
}`;
}

function getAboutSection(config) {
  return `export function AboutSection() {
  return (
    <section className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h2 className="text-3xl font-semibold mb-4">${config.aboutSection.title}</h2>
      <p className="text-muted-foreground text-lg">${config.aboutSection.description}</p>
    </section>
  );
}`;
}

function getBenefitsSection(config) {
  return `import { Check } from "lucide-react";

export function BenefitsSection() {
  const benefits = ${JSON.stringify(config.benefitsSection.items)};

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-semibold mb-8">${config.benefitsSection.title}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        {benefits.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check className="text-green-500 mt-1" />
            <span className="text-muted-foreground">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}`;
}

function getGuaranteeSection(config) {
  return `export function GuaranteeSection() {
  return (
    <section className="bg-muted py-16 px-4 text-center">
      <h2 className="text-2xl font-semibold mb-4">${config.guaranteeSection.title}</h2>
      <p className="text-muted-foreground max-w-xl mx-auto">${config.guaranteeSection.description}</p>
    </section>
  );
}`;
}

function getFAQSection(config) {
  return `import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = ${JSON.stringify(config.faqSection.questions)};

  return (
    <section className="max-w-3xl mx-auto py-16 px-4">
      <h2 className="text-3xl font-semibold text-center mb-6">${config.faqSection.title}</h2>
      <Accordion type="single" collapsible>
        {faqs.map((q, index) => (
          <AccordionItem value={\`faq-\${index}\`} key={index}>
            <AccordionTrigger>{q.question}</AccordionTrigger>
            <AccordionContent>{q.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}`;
}

function getCTASection(config) {
  return `import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="text-center py-20 px-4 bg-primary text-primary-foreground">
      <h2 className="text-3xl font-semibold mb-2">${config.ctaSection.headline}</h2>
      <p className="text-lg mb-6">${config.ctaSection.subheadline}</p>
      <Button size="lg">${config.ctaSection.ctaText}</Button>
    </section>
  );
}`;
}

function getCopyrightSection(config) {
  return `export function CopyrightSection() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground">
      ${config.copyrightSection.text}
    </footer>
  );
}`;
}

module.exports = {
  getHeroSection,
  getAboutSection,
  getBenefitsSection,
  getGuaranteeSection,
  getFAQSection,
  getCTASection,
  getCopyrightSection
}; 