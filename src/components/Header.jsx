import React from "react";

const APP_URL = import.meta.env.VITE_APP_URL || "https://app.seudominio.com.br";
const logoUrl = new URL("../assets/visionfest-logo.svg", import.meta.url).href;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 header-glass">
      <div className="max-w-6xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="Visionfest"
            className="h-12 md:h-14 lg:h-16 w-auto -my-1 block"
            loading="eager"
            fetchpriority="high"
          />
          <span className="sr-only">Visionfest</span>
        </a>

        
        <div className="flex items-center gap-3">
          
          <a
            href={APP_URL}
            className="sm:hidden inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-[var(--brand-purple)] text-white text-xs font-semibold hover:opacity-90 transition"
          >
            Já sou cliente
          </a>

          
          <a
            href={APP_URL}
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[var(--brand-purple)] text-white hover:opacity-90 transition"
          >
            Já sou cliente
          </a>
        </div>
      </div>
    </header>
  );
}
