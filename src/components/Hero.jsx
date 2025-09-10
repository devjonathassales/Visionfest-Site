import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { track } from "../lib/analytics";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);
  const mockDashboardUrl = useMemo(
    () => new URL("../assets/mock-dashboard.svg", import.meta.url).href,
    []
  );
  const WA_URL = whatsAcolhimentoUrl();

  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br from-[#5B2C6F] via-[#000000] to-[#5B2C6F]
      "
    >
      {/* pattern neutro p/ não esverdear cards no dark */}
      <div aria-hidden className="absolute inset-0 opacity-10 pattern-dots" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 items-center gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-[Montserrat] font-extrabold leading-tight text-white">
            Gestão completa para fornecedores de festas —{" "}
            <span className="bg-gradient-to-r from-white to-[var(--brand-green)] bg-clip-text text-transparent">
              simples e rápida
            </span>
            .
          </h1>

          <p className="mt-5 text-lg text-slate-200 max-w-xl">
            Orçamentos, contratos, estoque, agenda e financeiro em um só lugar.
            Em breve: pagamentos direto na plataforma e o App Planner do
            Cliente.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#contato"
              onClick={() => track("cta_quero_conhecer")}
              className="btn-pulse px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold shadow-soft hover:translate-y-[-1px] transition inline-flex items-center gap-2"
            >
              Quero conhecer
              <ArrowRight size={18} />
            </a>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_whatsapp")}
              className="px-6 py-3 rounded-full border border-[var(--brand-green)] text-[var(--brand-green)] hover:bg-[var(--brand-green)] hover:text-black transition"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-slate-300">
            <ShieldCheck size={18} className="text-[var(--brand-green)]" />
            <span>Operação centralizada e segura</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-green)]">
            <div className="rounded-2xl bg-white/80 md:bg-white/80 backdrop-blur border border-white/60 shadow-soft overflow-hidden">
              {imgOk ? (
                <img
                  src={mockDashboardUrl}
                  alt="Painel Visionfest"
                  className="w-full h-auto"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="aspect-[16/10] w-full flex items-center justify-center text-slate-300">
                  <ImageIcon className="mr-2" /> Coloque o arquivo em{" "}
                  <code>src/assets/mock-dashboard.svg</code>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
