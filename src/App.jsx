import React from "react";
import FundoAurora from "./components/FundoAurora";
import Header from "./components/Header";
import Hero from "./components/Hero";
import VipCTA from "./components/VipCTA";
import LogoWall from "./components/LogoWall";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Reports from "./components/Reports";
import Integrations from "./components/Integrations";
import Roadmap from "./components/Roadmap";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import LeadForm from "./components/LeadForm";
import Footer from "./components/Footer";
import { injectJsonLd } from "./lib/seo";

injectJsonLd();

export default function App() {
  return (
    <div className="min-h-screen">
      <FundoAurora />
      <Header />
      <main>
        <Hero />
        <VipCTA />
        <LogoWall />
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Features />
        </section>
        <section className="section-glass">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <HowItWorks />
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Reports />
        </section>
        <section className="section-glass">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <Integrations />
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Roadmap />
        </section>
        <section className="section-glass">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <Pricing />
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Testimonials />
        </section>

        <section
          id="contato"
          className="relative bg-gradient-to-br from-[#5B2C6F] via-[#000000] to-[#5B2C6F]">
          <div aria-hidden className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#7ED957_1px,transparent_1px)] [background-size:24px_24px]"/>
          <div className="relative max-w-6xl mx-auto px-6 py-20">
            <LeadForm />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-20">
          <FAQ />
        </section>
      </main>
      <Footer />
    </div>
  );
}
