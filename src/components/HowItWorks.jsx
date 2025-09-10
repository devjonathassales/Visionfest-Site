import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "Cadastre e personalize",
    d: "Monte seu catálogo de itens e serviços.",
  },
  {
    n: "02",
    t: "Defina condições comerciais",
    d: "Regras de orçamento, contratos e políticas.",
  },
  {
    n: "03",
    t: "Orçamentos e contratos",
    d: "Envie propostas, assine e acompanhe.",
  },
  { n: "04", t: "Acompanhe tudo", d: "Agenda, OS, financeiro e relatórios." },
];

export default function HowItWorks() {
  return (
    <div id="como-funciona">
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold text-center">
        Como funciona
      </h2>
      <div className="mt-10 grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="p-6 rounded-2xl card shadow-soft"
          >
            <div className="text-sm text-muted">{s.n}</div>
            <div className="mt-1 font-[Montserrat] font-bold">{s.t}</div>
            <div className="mt-2 text-muted">{s.d}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
