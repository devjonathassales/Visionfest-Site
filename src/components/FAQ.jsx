import React, { useState } from "react";

const items = [
  { q: "Tem fidelidade?", a: "Não. Você pode cancelar quando quiser." },
  {
    q: "Como funciona a cobrança?",
    a: "No lançamento, não há gateway para receber do cliente final. Em breve, pagamentos direto na plataforma.",
  },
  {
    q: "Posso migrar meus dados?",
    a: "Sim. Ajudamos no onboarding e importação de dados essenciais.",
  },
  {
    q: "LGPD e segurança?",
    a: "Coletamos o mínimo necessário e protegemos seus dados com boas práticas.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold text-center">
        Perguntas frequentes
      </h2>
      <div className="mt-8 max-w-3xl mx-auto">
        {items.map((it, i) => (
          <div key={i} className="border-b border-subtle py-4">
            <button
              className="w-full text-left font-semibold flex justify-between items-center"
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              {it.q}
              <span className="text-[var(--brand-green)]">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && <p className="mt-2 text-muted">{it.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
