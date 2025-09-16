import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";

const VIP_URL = import.meta.env.VITE_WHATSAPP_VIP; 
const WA_URL = whatsAcolhimentoUrl();

export default function VipCTA() {
  return (
    <section className="relative vignette-top">
      <div aria-hidden className="pattern-dots opacity-10 inset-0" />
      <div className="relative max-w-6xl mx-auto px-6 py-14 z-10">
        <div className="card rounded-2xl p-8 md:p-10 shadow-soft">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full glass">
                <Sparkles size={16} className="text-[var(--brand-green)]" />
                Lançamento Visionfest
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-[Montserrat] font-extrabold">
                Entre no nosso Grupo VIP e garanta condições exclusivas
              </h3>
              <p className="mt-2 text-muted">
                Descontos de lançamento, novidades primeiro e prioridade nos
                convites de demonstração.
              </p>
            </div>

            <div className="grid sm:grid-cols-1 gap-3 md:text-right">
              
              <a
                href={VIP_URL || WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulse px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition inline-flex items-center gap-2"
              >
                Entrar no Grupo VIP
                <ArrowRight size={18} />
              </a>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
