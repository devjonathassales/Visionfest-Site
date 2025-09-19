// src/components/Pricing.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Infinity as InfinityIcon,
  Zap,
  Clock,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Layers,
  Workflow,
  Crown,
  MessageSquare,
  Percent,
} from "lucide-react";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";

/* ----- preços base (mensal) ----- */
const BASE_MONTHLY = { essencial: 179, operacao: 200, full: 259 };

const ADDONS = { userExtra: 24, companyExtra: 79, storageGb: 9 };

const plans = [
  {
    key: "essencial",
    name: "Essencial",
    tagline: "Mais econômico para começar",
    users: "5 usuários",
    bullets: [
      { icon: CheckCircle2, text: "Contratos & OS, Agenda & alertas" },
      {
        icon: Layers,
        text: "Estoque alugável + Matéria-prima (insumos/receitas)",
      },
      { icon: ShieldCheck, text: "Relatórios essenciais" },
      { icon: Users, text: "App de ponto (básico)" },
      { icon: Clock, text: "Evolução: 2h/mês • Triagem 5d • Entrega até 30d" },
      { icon: Workflow, text: "Melhorias da comunidade após 60 dias" },
    ],
    ribbon: "Mais econômico",
  },
  {
    key: "operacao",
    name: "Operação",
    tagline: "Básico + fluxo diário",
    users: "15 usuários",
    bullets: [
      { icon: CheckCircle2, text: "Tudo do Essencial + CRM & Leads" },
      {
        icon: ShieldCheck,
        text: "Relatórios completos & Permissões avançadas",
      },
      { icon: Zap, text: "Automações básicas" },
      { icon: Clock, text: "Evolução: 5h/mês • Triagem 3d • Entrega até 15d" },
      { icon: Zap, text: "Fast-track: 1 solicitação/trim. (até 4h)" },
      { icon: Workflow, text: "Melhorias da comunidade após 30 dias" },
    ],
    ribbon: null,
  },
  {
    key: "full",
    name: "Full",
    tagline: "Parceria de produto (recomendado)",
    users: "Usuários ilimitados",
    bullets: [
      { icon: CheckCircle2, text: "Todos os módulos atuais e futuros" },
      {
        icon: Sparkles,
        text: "FeatureSync: recebe melhorias da comunidade imediatamente",
      },
      { icon: Clock, text: "Evolução: 12h/mês (acúmulo até 24h)" },
      {
        icon: Zap,
        text: "Triagem 1d • Entrega 5–10d • Fast-track ilimitado (dentro das horas)",
      },
      {
        icon: Crown,
        text: "Sucesso do cliente dedicado • Acompanhamento mensal",
      },
    ],
    ribbon: "Recomendado",
  },
  {
    key: "enterprise",
    name: "Enterprise",
    tagline: "Sob medida",
    users: "Escopo customizado",
    bullets: [
      { icon: InfinityIcon, text: "Usuários/filiais sob demanda" },
      { icon: Layers, text: "Integrações, SSO e governança" },
      { icon: Clock, text: "SLAs customizados e priorização por contrato" },
      { icon: MessageSquare, text: "Treinamento e migração de dados" },
    ],
    ribbon: null,
  },
];

function formatBRL(n) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function usePrices(cycle) {
  return useMemo(() => {
    if (cycle === "mensal") {
      return {
        essencial: {
          perMonth: BASE_MONTHLY.essencial,
          annualTotal: null,
          note: "por mês",
        },
        operacao: {
          perMonth: BASE_MONTHLY.operacao,
          annualTotal: null,
          note: "por mês",
        },
        full: {
          perMonth: BASE_MONTHLY.full,
          annualTotal: null,
          note: "por mês",
        },
      };
    }
    const eff = (m) => Math.round((m * 10) / 12); // 2 meses grátis
    return {
      essencial: {
        perMonth: eff(BASE_MONTHLY.essencial),
        annualTotal: BASE_MONTHLY.essencial * 10,
        note: "por mês (cobrado anualmente)",
      },
      operacao: {
        perMonth: eff(BASE_MONTHLY.operacao),
        annualTotal: BASE_MONTHLY.operacao * 10,
        note: "por mês (cobrado anualmente)",
      },
      full: {
        perMonth: eff(BASE_MONTHLY.full),
        annualTotal: BASE_MONTHLY.full * 10,
        note: "por mês (cobrado anualmente)",
      },
    };
  }, [cycle]);
}

/* ========= Helper: URL de WhatsApp com mensagem + UTMs =========
   Garantimos que não caia na msg padrão. */
function buildPlanWhatsappUrl({ planName, cycle }) {
  const text = `Olá! Tenho interesse no plano ${planName} (${cycle}). Gostaria de agendar uma demonstração.`;
  // whatsAcolhimentoUrl aceita { text } e monta a base correta (api.whatsapp.com/send?...).
  const base = whatsAcolhimentoUrl({ text });
  const u = new URL(base);

  // UTM fixas para análise do tráfego
  u.searchParams.set("utm_source", "site");
  u.searchParams.set("utm_medium", "cta");
  u.searchParams.set("utm_campaign", "pricing");
  u.searchParams.set("utm_content", `plan-${planName.toLowerCase()}`);
  u.searchParams.set("utm_term", cycle);

  return u.toString();
}

function PromoBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full glass">
      <Percent size={12} /> {children}
    </span>
  );
}

function PlanCard({ plan, i, cycle, priceMap }) {
  const IconTop =
    plan.key === "full"
      ? Crown
      : plan.key === "operacao"
      ? Zap
      : plan.key === "essencial"
      ? ShieldCheck
      : InfinityIcon;

  const hasPrice = plan.key !== "enterprise";
  const diffToFull =
    hasPrice && plan.key === "operacao"
      ? priceMap.full.perMonth - priceMap.operacao.perMonth
      : null;

  const WA_DEMO_URL =
    plan.key === "enterprise"
      ? buildPlanWhatsappUrl({ planName: "Enterprise", cycle }) // texto enterprise também customizado
      : buildPlanWhatsappUrl({ planName: plan.name, cycle });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.36, delay: i * 0.05 }}
      className={`relative rounded-2xl card shadow-soft overflow-hidden ${
        plan.key === "full"
          ? "ring-2 ring-[var(--brand-green)] md:scale-[1.02]"
          : ""
      }`}
    >
      {/* Borda gradiente */}
      <div className="absolute inset-0 -z-10 p-[1.5px]">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] via-transparent to-[var(--brand-green)] opacity-30" />
      </div>

      {plan.ribbon && (
        <div className="absolute top-3 right-3">
          <span className="inline-block text-xs font-semibold px-2 py-1 rounded-full glass">
            {plan.ribbon}
          </span>
        </div>
      )}

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-3">
          <IconTop className="text-[var(--brand-green)]" />
          <h3 className="text-xl md:text-2xl font-[Montserrat] font-extrabold">
            {plan.name}
          </h3>
        </div>
        <p className="mt-1 text-muted">{plan.tagline}</p>

        <div className="mt-4 inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full glass">
          <Users size={16} className="text-[var(--brand-green)]" />
          {plan.users}
        </div>

        {/* Preço */}
        {plan.key !== "enterprise" && (
          <div className="mt-5">
            {cycle === "anual" && (
              <div className="mb-2">
                <PromoBadge>2 meses grátis</PromoBadge>
              </div>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-muted">A partir de</span>
              <span className="text-3xl md:text-4xl font-[Montserrat] font-extrabold">
                {formatBRL(priceMap[plan.key].perMonth)}
              </span>
              <span className="text-sm text-muted">/mês</span>
            </div>
            <p className="text-xs text-muted mt-1">{priceMap[plan.key].note}</p>
            {cycle === "anual" && (
              <p className="text-xs text-muted">
                Total anual: <b>{formatBRL(priceMap[plan.key].annualTotal)}</b>
              </p>
            )}

            {diffToFull !== null && (
              <p className="text-xs text-muted mt-2">
                Por <b>{formatBRL(diffToFull)}</b>/mês leve o <b>Full</b> com
                usuários ilimitados e FeatureSync.
              </p>
            )}
          </div>
        )}

        <ul className="mt-6 space-y-3">
          {plan.bullets.map((b, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <b.icon
                size={18}
                className="mt-0.5 shrink-0 text-[var(--brand-green)]"
              />
              <span className="text-default">{b.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 grid gap-3">
          <a
            href={WA_DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-5 py-3 rounded-full inline-flex items-center justify-center gap-2 transition font-semibold ${
              plan.key === "full"
                ? "btn-pulse bg-[var(--brand-green)] text-black hover:translate-y-[-1px]"
                : "bg-[var(--brand-green)] text-black hover:translate-y-[-1px]"
            }`}
          >
            Agendar demonstração
            <ArrowRight size={18} />
          </a>
        </div>

        {plan.key !== "enterprise" && (
          <p className="mt-3 text-xs text-muted">
            Eventos ilimitados em todos os planos.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* ---- Barra Enterprise full-width e compacta ---- */
function EnterpriseBar({ plan, cycle }) {
  const IconTop = InfinityIcon;

  const WA_DEMO_URL = buildPlanWhatsappUrl({
    planName: "Enterprise",
    cycle,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.36, delay: 0.1 }}
      className="relative w-full rounded-2xl card shadow-soft overflow-hidden"
    >
      {/* Borda gradiente */}
      <div className="absolute inset-0 -z-10 p-[1.5px]">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-[var(--brand-purple)] via-transparent to-[var(--brand-green)] opacity-30" />
      </div>

      <div className="p-5 md:p-6 lg:p-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div className="min-w-[220px]">
            <div className="flex items-center gap-3">
              <IconTop className="text-[var(--brand-green)]" />
              <h3 className="text-xl font-[Montserrat] font-extrabold">
                {plan.name}
              </h3>
            </div>
            <p className="text-muted mt-1">{plan.tagline}</p>
            <div className="mt-2 inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full glass">
              <Users size={16} className="text-[var(--brand-green)]" />
              {plan.users}
            </div>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm leading-relaxed md:flex-1">
            {plan.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <b.icon
                  size={16}
                  className="mt-0.5 shrink-0 text-[var(--brand-green)]"
                />
                <span className="text-default">{b.text}</span>
              </li>
            ))}
          </ul>

          <div className="shrink-0">
            <a
              href={WA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full inline-flex items-center justify-center gap-2 transition font-semibold bg-[var(--brand-green)] text-black hover:translate-y-[-1px]"
            >
              Falar com vendas
              <ArrowRight size={18} />
            </a>
            <p className="text-xs text-muted mt-1 text-center md:text-right">
              Projeto e SLA sob medida
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [cycle, setCycle] = useState("mensal");
  const prices = usePrices(cycle);

  const mainPlans = plans.filter((p) => p.key !== "enterprise");
  const enterprise = plans.find((p) => p.key === "enterprise");

  return (
    <section id="precos" className="relative vignette-top">
      <div aria-hidden className="pattern-dots opacity-10 inset-0" />
      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-20 z-10">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-[Montserrat] font-extrabold">
            Planos e preços
          </h2>
        </div>

        {/* Toggle Mensal / Anual */}
        <div className="mt-6 text-center">
          <div className="inline-flex p-1 rounded-full glass">
            <button
              onClick={() => setCycle("mensal")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                cycle === "mensal"
                  ? "bg-[var(--brand-green)] text-black"
                  : "text-muted hover:text-default"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setCycle("anual")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                cycle === "anual"
                  ? "bg-[var(--brand-green)] text-black"
                  : "text-muted hover:text-default"
              }`}
            >
              Anual <span className="opacity-80 ml-1">(2 meses grátis)</span>
            </button>
          </div>
        </div>

        {/* 3 planos principais */}
        <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {mainPlans.map((p, i) => (
            <PlanCard
              key={p.key}
              plan={p}
              i={i}
              cycle={cycle}
              priceMap={prices}
            />
          ))}
        </div>

        {/* Enterprise compacto full-width */}
        {enterprise && (
          <div className="mt-6">
            <EnterpriseBar plan={enterprise} cycle={cycle} />
          </div>
        )}

        {/* Notas/legendas + add-ons */}
        <div className="mt-8 text-xs text-muted space-y-1">
          <p>
            • <b>Créditos de melhoria</b> incluídos variam por plano; pedidos
            que fizerem sentido para todos podem virar parte do produto (core).
            No <b>Full</b>, o acesso é imediato via <b>FeatureSync</b>.
          </p>
          <p>
            • <b>Add-ons</b>: usuário extra {formatBRL(ADDONS.userExtra)}/mês;
            empresa extra {formatBRL(ADDONS.companyExtra)}/mês; armazenamento{" "}
            {formatBRL(ADDONS.storageGb)}/GB/mês.
          </p>
          <p>
            • Integrações especiais e módulos adicionais podem ser contratados à
            parte. App Planner do Cliente e pagamentos diretos na plataforma:{" "}
            <b>em breve</b>.
          </p>
        </div>
      </div>
    </section>
  );
}
