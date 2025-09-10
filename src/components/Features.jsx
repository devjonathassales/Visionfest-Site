import React from "react";
import { motion } from "framer-motion";
import {
  Boxes,
  FlaskConical,
  FileSignature,
  Wallet,
  CalendarCheck,
  BarChart3,
  Building,
  Users,
  ClipboardCheck,
} from "lucide-react";

const items = [
  {
    icon: Boxes,
    title: "Estoque alugável",
    desc: "Disponibilidade por data, controle de avarias e reposição.",
  },

  {
    icon: FlaskConical,
    title: "Estoque de matéria-prima",
    desc: "Insumos para produção (drinks, doces etc.), fichas técnicas/receitas, conversão de unidades (ml/g/un), custo por receita e alertas de mínimo.",
  },

  {
    icon: FileSignature,
    title: "Contratos & OS",
    desc: "Modelos com assinatura, checklist e status de execução.",
  },
  {
    icon: Wallet,
    title: "Financeiro",
    desc: "Contas a receber/pagar, parcelas e conciliações internas.",
  },
  {
    icon: CalendarCheck,
    title: "Agenda & alertas",
    desc: "Equipe alinhada, prazos e entregas no ritmo certo.",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    desc: "Receitas, despesas, utilização, sazonalidade e KPIs.",
  },
  {
    icon: Building,
    title: "Multi-empresa",
    desc: "Cresça com segurança e segregação de dados.",
  },

  // NOVOS
  {
    icon: Users,
    title: "Cadastro de funcionários",
    desc: "Dados de equipe, perfis e permissões por função/área.",
  },
  {
    icon: ClipboardCheck,
    title: "App de ponto & checklist",
    desc: "Registro de ponto em campo e checklist com assinatura de recebimento pelo colaborador nos eventos.",
  },
];

export default function Features() {
  return (
    <div id="features">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold">
          Tudo que sua operação precisa
        </h2>
        <p className="mt-3 text-muted">
          Do orçamento ao pós-evento, em uma única plataforma.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="p-6 rounded-2xl card shadow-soft"
          >
            <item.icon className="text-[var(--brand-green)]" />
            <h3 className="mt-4 font-[Montserrat] font-bold text-lg">
              {item.title}
            </h3>
            <p className="mt-2 text-muted">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
