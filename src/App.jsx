import React, { useEffect } from "react";
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
import ToastCenter from "./components/ToastCenter";
import { injectJsonLd } from "./lib/seo";
import { flushQueuedLeads } from "./lib/leads"; // <-- NOVO

injectJsonLd();

export default function App() {
  // Captura UTMs da URL e salva no localStorage para o LeadForm
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search);
      if (![...sp.keys()].length) return;
      const utm = {
        utm_source: sp.get("utm_source") || "",
        utm_medium: sp.get("utm_medium") || "",
        utm_campaign: sp.get("utm_campaign") || "",
        utm_term: sp.get("utm_term") || "",
        utm_content: sp.get("utm_content") || "",
        ref: document.referrer || "",
        ts: Date.now(),
      };
      localStorage.setItem("utm", JSON.stringify(utm));
    } catch {}
  }, []);

  // Ao carregar a página (e quando voltar a conexão), tenta enviar a fila de leads
  useEffect(() => {
    flushQueuedLeads();
    const onOnline = () => flushQueuedLeads();
    window.addEventListener("online", onOnline);
    return () => window.removeEventListener("online", onOnline);
  }, []);

  return (
    <div className="min-h-screen">
      <FundoAurora />
      <Header />

      {/* Hub de toasts (ex.: mensagens do formulário) */}
      <ToastCenter />

      <main>
        <Hero />
        <VipCTA />

        {/* Gamificação removida por enquanto */}

        <LogoWall />

        <section className="max-w-6xl mx-auto px-6 py-20">
          <Features />
        </section>

        <section className="section-glass">
          <div className="max-w-6xl mx-auto px-6 py-20">
            <HowItWorks />
          </div>
        </section>

        {/* Qualificador de leads removido por enquanto */}

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

        {/* Contato / LeadForm */}
        <section
          id="contato"
          className="
            relative vignette-top scroll-mt-24
            bg-gradient-to-br from-[#5B2C6F] via-[#000000] to-[#5B2C6F]
          "
        >
          <div aria-hidden className="pattern-dots opacity-10 inset-0" />
          <div className="relative max-w-6xl mx-auto px-6 py-20 z-10">
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
