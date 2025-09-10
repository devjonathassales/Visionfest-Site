import {
  BarChart3,
  CalendarCheck,
  Wallet,
  Boxes,
  FileText,
  Megaphone,
} from "lucide-react";

const reports = [
  {
    icon: Wallet,
    title: "Financeiro (Receitas & Despesas)",
    bullets: [
      "Receita prevista e realizada por período",
      "Pagamentos a fornecedores por período",
      "Inadimplência e aging de títulos",
      "Centro de custo e conciliações básicas",
    ],
  },
  {
    icon: CalendarCheck,
    title: "Agenda & Execução",
    bullets: [
      "Eventos por status/data",
      "Workload por dia/semana e conflitos",
      "Cumprimento de prazos e SLA operacional",
    ],
  },
  {
    icon: Boxes,
    title: "Estoque & Utilização",
    bullets: [
      "Itens mais locados e sazonalidade",
      "Giro de estoque e avarias",
      "Previsão de disponibilidade por data",
    ],
  },
  {
    icon: FileText,
    title: "Contratos & Pipeline",
    bullets: [
      "Taxa de conversão de orçamentos",
      "Ticket médio e margem por contrato",
      "Serviços/produtos mais contratados",
    ],
  },
  {
    icon: BarChart3,
    title: "Visão Gerencial (KPIs)",
    bullets: [
      "Receita recorrente/prevista (se aplicável)",
      "Top clientes e LTV (CRM)",
      "Forecast de caixa e tendências",
    ],
  },

  {
    icon: Megaphone,
    title: "CRM & Leads",
    bullets: [
      "Origem dos leads e canais de aquisição",
      "Taxa de resposta e tempo de atendimento",
      "Conversão por etapa do funil",
      "ROI de campanhas (quando disponível)",
    ],
  },
];

export default function Reports() {
  return (
    <div id="relatorios">
      <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold text-center">
        Relatórios & indicadores
      </h2>
      <p className="mt-3 text-center text-muted max-w-3xl mx-auto">
        Insights prontos para decisão: financeiro, agenda, estoque, contratos e
        CRM — com base no seu fluxo real.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((r, i) => (
          <div key={i} className="p-6 rounded-2xl card shadow-soft">
            <r.icon className="text-[var(--brand-green)]" />
            <h3 className="mt-4 font-[Montserrat] font-bold text-lg">
              {r.title}
            </h3>
            <ul className="mt-3 text-muted space-y-2 list-disc list-inside">
              {r.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
