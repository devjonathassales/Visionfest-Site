import React from "react";
import { Sparkles, Gift, Users } from "lucide-react";
import { whatsVipUrl } from "../lib/whatsapp";

export default function VipCTA() {
  const VIP_URL = whatsVipUrl();

  return (
    <section className="relative">
      {/* pattern neutro pra não tingir o bloco */}
      <div aria-hidden className="absolute inset-0 opacity-10 pattern-dots" />
      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Borda com gradiente brand; card interno é sólido via .card */}
        <div className="p-[2px] rounded-2xl bg-gradient-to-r from-[var(--brand-purple)] to-[var(--brand-green)] shadow-soft">
          <div className="rounded-2xl card px-6 py-10 md:px-10 md:py-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full glass">
                <Sparkles size={16} className="text-[var(--brand-green)]" />
                Lançamento Visionfest
              </div>
              <h3 className="mt-3 text-2xl md:text-3xl font-[Montserrat] font-extrabold">
                Grupo VIP no WhatsApp — descontos e condições exclusivas!
              </h3>
              <p className="mt-2 text-muted max-w-2xl">
                Entre para receber ofertas de lançamento, vagas de early
                adopters, planos especiais e novidades em primeira mão.
              </p>
              <ul className="mt-4 text-sm text-muted grid sm:grid-cols-2 gap-2">
                <li className="flex items-center gap-2">
                  <Gift size={16} className="text-[var(--brand-green)]" />{" "}
                  Cupons de desconto
                </li>
                <li className="flex items-center gap-2">
                  <Users size={16} className="text-[var(--brand-green)]" />{" "}
                  Condições para primeiras empresas
                </li>
              </ul>
            </div>

            <div className="shrink-0">
              <a
                href={VIP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pulse px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition inline-flex items-center gap-2"
              >
                Entrar no Grupo VIP
                <Sparkles size={18} />
              </a>
              <p className="text-xs text-muted mt-2">
                Convite direto no WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
