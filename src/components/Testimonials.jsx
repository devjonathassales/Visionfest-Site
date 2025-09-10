import React from "react";

export default function Testimonials() {
  const quotes = [
    {
      q: "Economizamos horas por evento. A visão do financeiro ficou clara.",
      a: "Ana, Buffet Festivo",
    },
    {
      q: "Adeus planilhas. Controle de estoque alugável impecável.",
      a: "Carlos, Locadora&Luz",
    },
    {
      q: "Começamos a organizar contratos e agenda em um só lugar.",
      a: "Juliana, Brindes&Co",
    },
  ];
  return (
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold">
        Quem usa, recomenda
      </h2>
      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {quotes.map((c, i) => (
          <figure
            key={i}
            className="p-6 rounded-2xl card shadow-soft text-left"
          >
            <blockquote className="text-default">“{c.q}”</blockquote>
            <figcaption className="mt-4 text-sm text-muted">— {c.a}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
