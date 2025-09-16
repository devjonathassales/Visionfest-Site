// src/components/Footer.jsx
import React from "react";
import { Instagram, ChevronUp } from "lucide-react";

const IG_URL = import.meta.env.VITE_INSTAGRAM_URL; 
const currentYear = new Date().getFullYear();

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative section-glass mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 md:py-12">
        {/* linha de cima */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg md:text-xl font-[Montserrat] font-extrabold">
              Siga a Visionfest
            </h3>
            <p className="text-sm text-muted mt-1">
              Bastidores, novidades e ofertas de lançamento.
            </p>
          </div>

          {/* Ações: Instagram + Voltar ao topo  */}
          <div className="flex items-center gap-3">
            {/* Ícone do Instagram (logo) */}
            <a
              href={IG_URL}
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

            {/* Voltar ao topo — discreto */}
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

        {/* separador */}
        <div className="my-8 border-t border-subtle" />

        {/* linha de baixo */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm">
          <div className="text-muted">
            © {currentYear} Visionfest — Todos os direitos reservados.
          </div>

          {/* Links legais */}
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
