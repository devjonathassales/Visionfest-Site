import React, { useState } from "react";
import { track } from "../lib/analytics";
import { whatsAcolhimentoUrl } from "../lib/whatsapp";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  function toast(detail) {
    window.dispatchEvent(new CustomEvent("vf:toast", { detail }));
  }

  // Monta o link do WhatsApp com mensagem + UTMs (fixas + capturadas)
  function buildWhatsUrl(payload) {
    const base = whatsAcolhimentoUrl(); 
    const FIXED_UTM = {
      utm_source: "lp",
      utm_medium: "leadform",
      utm_campaign: "launch",
    };

    // junta UTMs fixas com as da URL (se houver no localStorage)
    let utmAll = { ...FIXED_UTM };
    try {
      const stored = JSON.parse(localStorage.getItem("utm") || "{}");
      utmAll = { ...utmAll, ...stored };
    } catch {}

    // monta “UTM: k=v · k=v …”
    const utmStr = Object.entries(utmAll)
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${v}`)
      .join(" · ");

    try {
      const u = new URL(base);
      const already = u.searchParams.get("text") || "";

      const nome = payload?.nome || "";
      const empresa = payload?.empresa || "";
      const email = payload?.email || "";
      const fone = payload?.whatsapp || "";
      const origem = `Origem: LP (${window.location.pathname || "/"})`;

      const extra =
        `Olá! Sou ${nome}${empresa ? " da " + empresa : ""}. ` +
        `Quero agendar uma demonstração do Visionfest.\n` +
        (email ? `E-mail: ${email}\n` : "") +
        (fone ? `WhatsApp: ${fone}\n` : "") +
        `${origem}\n` +
        (utmStr ? `UTM: ${utmStr}` : "");

      const msg = already ? `${already}\n\n${extra}` : extra;
      u.searchParams.set("text", msg);
      return u.toString();
    } catch {
      return base; // fallback bruto
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Anexa UTMs ao payload que será enviado ao backend
    try {
      const stored = JSON.parse(localStorage.getItem("utm") || "{}");
      Object.assign(data, stored, {
        utm_source: "lp",
        utm_medium: "leadform",
        utm_campaign: "launch",
      });
    } catch {}

    // 👉 abre WhatsApp imediatamente (nova aba). Se bloqueado, usa a mesma aba
    const waHref = buildWhatsUrl(data);
    track("whatsapp_redirect_from_form");
    toast({
      title: "Abrindo WhatsApp…",
      message: "Estamos te levando para o atendimento.",
      type: "info",
    });
    const win = window.open(waHref, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = waHref;

    // Envia o lead em paralelo
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao enviar");

      setOk(true);
      track("form_submit");

      // marca missão + toast local
      window.dispatchEvent(new Event("vf:lead_submitted"));
      toast({
        title: "Obrigado!",
        message:
          "Recebemos seus dados. Nossa equipe continuará o atendimento no WhatsApp.",
        type: "success",
      });

      e.currentTarget.reset();
    } catch (e) {
      setErr("Não foi possível enviar. Tente novamente.");
      toast({
        title: "Erro ao enviar",
        message: "Verifique sua conexão e tente de novo.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass rounded-2xl p-8 max-w-3xl mx-auto shadow-soft">
      <h3 className="text-2xl font-[Montserrat] font-extrabold">Comece hoje</h3>
      <p className="mt-2 text-muted">
        Preencha e retornaremos com acesso/agenda de demonstração.
      </p>

      <form className="mt-6 grid md:grid-cols-2 gap-4" onSubmit={onSubmit}>
        <input
          name="nome"
          required
          placeholder="Seu nome"
          className="px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        />
        <input
          name="empresa"
          placeholder="Empresa"
          className="px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        />
        <input
          name="email"
          type="email"
          required
          placeholder="E-mail"
          className="px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        />
        <input
          name="whatsapp"
          type="tel"
          placeholder="WhatsApp"
          className="px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        />
        <textarea
          name="mensagem"
          placeholder="Fale rapidamente sobre sua operação"
          className="md:col-span-2 px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        ></textarea>

        <button
          disabled={loading}
          className="md:col-span-2 px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition disabled:opacity-60"
        >
          {loading ? "Enviando…" : "Agendar demonstração"}
        </button>
      </form>

      {ok && (
        <p className="mt-3 text-green-400">
          Recebemos seus dados, em breve entraremos em contato.
        </p>
      )}
      {err && <p className="mt-3 text-red-400">{err}</p>}

      <p className="mt-4 text-xs text-muted">
        Ao continuar, você concorda com nossos{" "}
        <a href="#" className="underline">
          Termos
        </a>{" "}
        e{" "}
        <a href="#" className="underline">
          Privacidade
        </a>
        .
      </p>
    </div>
  );
}
