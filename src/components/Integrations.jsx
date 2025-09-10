import React from "react";
import { Wallet, Smartphone } from "lucide-react";

const items = [
  {
    icon: Wallet,
    title: "Pagamentos na plataforma",
    desc: "Integração para que as empresas recebam pagamentos diretamente no Visionfest (cartão, Pix e boleto conforme suporte).",
    badge: "Em breve",
  },
  {
    icon: Smartphone,
    title: "App Planner do Cliente",
    desc: "O cliente final poderá ver o catálogo das empresas, pagar e contratar direto pelo app.",
    badge: "Em breve",
  },
];

export default function Integrations() {
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold text-center">
        Integrações
      </h2>
      <p className="mt-3 text-center text-muted max-w-3xl mx-auto">
        Começamos simples e sólido. Em breve: pagamentos direto na plataforma e
        o Planner do Cliente.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <div
            key={i}
            className="p-[2px] rounded-2xl bg-gradient-to-r from-[var(--brand-purple)]/25 to-[var(--brand-green)]/25"
          >
            <div className="p-6 rounded-2xl card shadow-soft h-full">
              <div className="flex items-center justify-between">
                <it.icon className="text-[var(--brand-green)]" />
                <span className="text-xs px-2 py-1 rounded-full glass">
                  {it.badge}
                </span>
              </div>
              <h3 className="mt-4 font-[Montserrat] font-bold text-lg">
                {it.title}
              </h3>
              <p className="mt-2 text-muted">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted">
        *No lançamento, não há integração de pagamento. Estudando gateway para
        recebimento direto no sistema.
      </p>
    </div>
  );
}
