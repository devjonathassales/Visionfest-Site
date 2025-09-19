import React from "react";
import { Instagram, ChevronUp } from "lucide-react";
import { withUtm } from "../lib/utm";

const RAW_IG = (
  import.meta.env?.VITE_SOCIAL_INSTAGRAM ??
  import.meta.env?.VITE_INSTAGRAM_URL ??
  ""
)
  .toString()
  .trim();

const HARD_FALLBACK_IG = "https://www.instagram.com/visionfestofc";

function normalizeUrl(u) {
  try {
    if (!u) return "";
    let s = String(u).trim();
    if (!/^https?:\/\//i.test(s)) s = "https://" + s.replace(/^\/+/, "");
    new URL(s); 
    return s;
  } catch {
    return "";
  }
}

const IG_BASE = normalizeUrl(RAW_IG) || HARD_FALLBACK_IG; // 👈 base com fallback
const IG_URL = withUtm(IG_BASE, {
  source: "site",
  medium: "footer",
  campaign: "lp",
  content: "instagram",
});
const igEnabled = !!IG_URL;

const currentYear = new Date().getFullYear();

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const openInstagram = (e) => {
    e?.preventDefault?.();
    try {
      
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "click", { label: "footer_instagram" });
      }
    } catch {}
    
    window.open(IG_URL, "_blank", "noopener,noreferrer");
  };

  if (import.meta.env?.DEV) {
    console.debug("[Footer] Instagram URL ativo:", IG_URL || "<vazio>");
  }

  return (
    <footer className="relative section-glass mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-[Montserrat] font-extrabold">
              Siga a Visionfest
            </h3>
            <p className="text-sm text-muted mt-1">
              Bastidores, novidades e ofertas de lançamento.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={IG_URL}
              onClick={openInstagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir Instagram da Visionfest"
              title="Instagram"
              className="p-2.5 rounded-full border border-[var(--brand-green)]
                         text-[var(--brand-green)] hover:bg-[var(--brand-green)]
                         hover:text-black transition"
            >
              <Instagram size={18} />
            </a>

            <button
              onClick={toTop}
              aria-label="Voltar ao topo"
              title="Voltar ao topo"
              className="p-2.5 rounded-full glass border-subtle hover:border-[var(--brand-green)]
                         text-default transition"
            >
              <ChevronUp size={18} />
            </button>
          </div>
        </div>

        <div className="my-8 border-t border-subtle" />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <div className="text-muted">
            © {currentYear} Visionfest — Todos os direitos reservados.
          </div>
          <div className="text-muted">
            <a
              href="/termos.html"
              className="hover:text-[var(--brand-green)] mr-4"
              target="_self"
            >
              Termos de Uso
            </a>
            <a
              href="/privacidade.html"
              className="hover:text-[var(--brand-green)]"
              target="_self"
            >
              Privacidade (LGPD)
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
