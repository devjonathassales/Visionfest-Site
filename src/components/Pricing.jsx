import React from "react";

export default function Pricing() {
  return (
    <div id="precos" className="text-center">
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold">
        Planos e preços
      </h2>
      <p className="mt-3 text-muted">
        Planos por funcionalidades liberadas. Sem limite de eventos.
      </p>

      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-2xl card shadow-soft">
            <div className="font-[Montserrat] font-bold">Plano {i}</div>
            <div className="mt-2 text-3xl font-extrabold">R$ --</div>
            <ul className="mt-4 text-left text-muted space-y-2">
              <li>• Recurso A</li>
              <li>• Recurso B</li>
              <li>• Recurso C</li>
            </ul>
            <a
              href="#contato"
              className="mt-6 inline-block px-5 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition"
            >
              Quero este plano
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
