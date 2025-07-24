function getHeroSection(config) {
  return `import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] w-full flex items-center justify-center">
      <Image
        src="/hero-banner.jpg"
        alt="Hero Banner"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-white">${config.heroSection.headline}</h1>
        <p className="text-lg text-gray-200 mb-6">
          ${config.heroSection.subheadline}
        </p>
       <Button className="text-lg px-8 py-6 bg-primary hover:bg-primary/90">${config.heroSection.ctaText}</Button>
          <span className="text-sm text-orange-400 font-medium mt-4">
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
  return `
  "use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

export function BenefitsSection() {
  const images = [
    "/benefit-0.jpg",
    "/benefit-1.jpg",
    "/benefit-2.jpg",
    "/benefit-3.jpg",
    "/benefit-4.jpg",
  ];

  const benefits = ${JSON.stringify(config.benefitsSection.items)};

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold mb-8 text-left">Por que escolher o AdSnippet?</h2>
      <Carousel
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        plugins={[Autoplay({
          delay: 3000,
          stopOnInteraction: false,
          stopOnMouseEnter: false,
          rootNode: (emblaRoot) => emblaRoot.parentElement,
          playOnInit: true,
        })]}
        className="w-full"
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {images.map((src, index) => (
            <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/3">
              <Card className="border-none overflow-hidden rounded-4xl p-0">
                <div className="relative aspect-[3/5]">
                <Image
                  src={src}
                  alt={\`Benefit \${index + 1}\`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 p-6 flex items-start">
                  <p className="text-white font-medium text-xl">{benefits[index]}</p>
                </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
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

function getLayout() {
  return `import { ThemeProvider } from "@/components/theme-provider"
import { Encode_Sans_Condensed } from "next/font/google"
import "./globals.css"

const encodeSansCondensed = Encode_Sans_Condensed({ 
  subsets: ["latin"],
  // Incluir diferentes pesos da fonte para mais flexibilidade no design
  weight: ['300', '400', '500', '600', '700']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={encodeSansCondensed.className}>
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
}`;
}

module.exports = {
  getHeroSection,
  getAboutSection,
  getBenefitsSection,
  getGuaranteeSection,
  getFAQSection,
  getCTASection,
  getCopyrightSection,
  getLayout
}; 