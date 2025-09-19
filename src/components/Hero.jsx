import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Image as ImageIcon } from "lucide-react";
import { whatsAcolhimentoUrl, handleWhatsClick } from "../lib/whatsapp";

export default function Hero() {
  const [imgOk, setImgOk] = useState(true);
  const mockDashboardUrl = useMemo(
    () => new URL("../assets/mock-dashboard.png", import.meta.url).href,
    []
  );
  const WA_URL = whatsAcolhimentoUrl();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#5B2C6F] via-[#000000] to-[#5B2C6F]">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,#7ED957_1px,transparent_1px)] [background-size:24px_24px]"
      />

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
            Em breve: Aplicativo para seus clientes terem o controle dos
            contratos e realizar os pagamentos!
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={WA_URL}
              onClick={handleWhatsClick("hero_quero_conhecer")}
              className="btn-pulse px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold shadow-soft hover:translate-y-[-1px] transition inline-flex items-center gap-2"
              rel="nofollow noopener"
            >
              Quero conhecer
              <ArrowRight size={18} />
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
            <div className="rounded-2xl bg-white/85 md:bg-white/80 backdrop-blur border border-white/60 shadow-soft overflow-hidden">
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
                  <code>src/assets/mock-dashboard.png</code>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
