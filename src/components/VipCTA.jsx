import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";
import { withUtm } from "../lib/utm";

const CANDIDATES = [
  import.meta.env?.VITE_WHATSAPP_VIP_URL,
  import.meta.env?.VITE_WHATSAPP_VIP, // legado, se existir
  "https://chat.whatsapp.com/Bkkn0pPKJZX3wJ6cTe8BUL?", // fallback temporário
];

// Pega o primeiro valor válido
function pickVipUrl() {
  for (const raw of CANDIDATES) {
    if (typeof raw !== "string") continue;
    const v = raw.trim();
    if (!v) continue;
    const low = v.toLowerCase();
    if (low === "undefined" || low === "null") continue;
    return v;
  }
  return "";
}

// Valida se é link de GRUPO (chat.whatsapp.com/...)
function isGroupUrl(url) {
  return /^https?:\/\/chat\.whatsapp\.com\/[A-Za-z0-9_-]+/i.test(url.trim());
}

export default function VipCTA() {
  const vipUrlRaw = pickVipUrl();
  const valid = isGroupUrl(vipUrlRaw);

  // Adiciona UTM no link do GRUPO
  const vipUrl = valid
    ? withUtm(vipUrlRaw, {
        source: "site",
        medium: "cta",
        campaign: "lp",
        content: "vip_grupo",
      })
    : "";

  // Fallback WA com UTM caso não haja link de grupo válido
  const WA_FALLBACK = whatsAcolhimentoUrl({
    utm: {
      source: "site",
      medium: "cta",
      campaign: "lp",
      content: "vip_fallback",
    },
  });

  function openVip(e) {
    e?.preventDefault?.();
    const url = vipUrl || WA_FALLBACK;
    try {
      window.open(url, "_blank", "noopener,noreferrer");
    } catch {
      window.location.href = url;
    }
  }

  if (import.meta.env?.DEV) {
    console.debug(
      "[VIP] usando URL:",
      vipUrl || WA_FALLBACK,
      " (valid group? ",
      valid,
      ")"
    );
  }

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
                href={vipUrl || WA_FALLBACK}
                onClick={openVip}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="btn-pulse px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition inline-flex items-center gap-2"
                data-vip={vipUrlRaw}
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
