// src/components/Header.jsx
import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";


const APP_URL = import.meta.env.VITE_APP_URL || "https://app.seudominio.com.br";
const logoUrl = new URL("../assets/visionfest-logo.svg", import.meta.url).href;

export default function Header() {
  const [open, setOpen] = useState(false);
  const WA_URL = whatsAcolhimentoUrl();
  

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  // Atualiza progresso ao receber eventos globais ou mudança no storage
  useEffect(() => {
    function updateFromStorage() {
      setProg(missionProgress(getMissions()));
    }
    function onChanged(e) {
      if (e?.detail?.progress) setProg(e.detail.progress);
      else updateFromStorage();
    }
   
  }, []);

  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="h-12 md:h-14 lg:h-16 -my-1">
            <img
              src={logoUrl}
              alt="Visionfest"
              className="h-full w-auto block"
              loading="eager"
              fetchpriority="high"
            />
          </div>
          <span className="sr-only">Visionfest</span>
        </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="hover:text-[var(--brand-green)]">
            Recursos
          </a>
          <a href="#como-funciona" className="hover:text-[var(--brand-green)]">
            Como funciona
          </a>
          <a href="#relatorios" className="hover:text-[var(--brand-green)]">
            Relatórios
          </a>
          <a href="#precos" className="hover:text-[var(--brand-green)]">
            Planos
          </a>

          <ThemeToggle />

          <a
            href={APP_URL}
            className="px-4 py-2 rounded-full bg-[var(--brand-purple)] text-white hover:opacity-90 transition"
          >
            Já sou cliente
          </a>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-[var(--brand-green)] text-default hover:bg-[var(--brand-green)] hover:text-black transition"
          >
            Falar no WhatsApp
          </a>
        </nav>

        {/* Mobile button */}
        <button
          onClick={toggle}
          aria-label="Abrir menu"
          className="md:hidden p-2 rounded-xl border border-subtle card"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-50 ${
          open ? "" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            open ? "opacity-100" : "opacity-0"
          }`}
          onClick={close}
        />
        <nav
          role="dialog"
          aria-modal="true"
          style={{ background: "var(--menu-bg)", color: "var(--menu-text)" }}
          className={`absolute right-0 top-0 h-full w-[88%] max-w-xs menu-panel p-6 shadow-soft z-10 transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          aria-label="Menu"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="h-10">
              <img src={logoUrl} alt="Visionfest" className="h-full w-auto" />
            </div>
            <button
              onClick={close}
              aria-label="Fechar menu"
              className="p-2 rounded-lg border border-subtle"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="space-y-2">
            <li>
              <a
                href="#features"
                onClick={close}
                className="block py-2 text-default"
              >
                Recursos
              </a>
            </li>
            <li>
              <a
                href="#como-funciona"
                onClick={close}
                className="block py-2 text-default"
              >
                Como funciona
              </a>
            </li>
            <li>
              <a
                href="#relatorios"
                onClick={close}
                className="block py-2 text-default"
              >
                Relatórios
              </a>
            </li>
            <li>
              <a
                href="#precos"
                onClick={close}
                className="block py-2 text-default"
              >
                Planos
              </a>
            </li>
          </ul>

          <div className="mt-6 grid gap-3">
            <a
              href={APP_URL}
              onClick={close}
              className="px-4 py-3 rounded-full bg-[var(--brand-purple)] text-white text-center"
            >
              Já sou cliente
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="px-4 py-3 rounded-full border border-[var(--brand-green)] text-default text-center hover:bg-[var(--brand-green)] hover:text-black"
            >
              Falar no WhatsApp
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
