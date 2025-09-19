import React, { useState } from "react";
import { track } from "../lib/analytics";
import { saveLeadToWebhook } from "../lib/leads";

function genId() {
  try {
    return crypto.randomUUID();
  } catch {
    return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  }
}

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [queuedInfo, setQueuedInfo] = useState(false);
  const [err, setErr] = useState("");

  function toast(detail) {
    try {
      window.dispatchEvent(new CustomEvent("vf:toast", { detail }));
    } catch {}
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (loading) return; // trava duplo clique

    setLoading(true);
    setOk(false);
    setQueuedInfo(false);
    setErr("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = Object.fromEntries(formData.entries());

    // anexa UTM
    try {
      const utm = JSON.parse(localStorage.getItem("utm") || "{}");
      Object.assign(data, utm);
    } catch {}

    // **idempotência**
    if (!data.id) data.id = genId();

    try {
      const res = await saveLeadToWebhook(data);

      if (res.ok || res.queued) {
        setOk(true);
        if (res.queued) setQueuedInfo(true);
        toast({
          title: res.queued ? "Recebido (em fila)" : "Obrigado!",
          message: res.queued
            ? "Salvamos localmente e enviaremos assim que possível."
            : "Recebemos seus dados e já registramos aqui.",
          type: "success",
        });
        try {
          track("form_submit");
        } catch {}
        try {
          formEl.reset();
        } catch {}
        try {
          window.dispatchEvent(new Event("vf:lead_submitted"));
        } catch {}
      } else {
        setErr("Não foi possível enviar. Tente novamente.");
        toast({
          title: "Erro ao enviar",
          message: "Verifique sua conexão e tente de novo.",
          type: "error",
        });
      }
    } catch {
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
        
        <input type="hidden" name="id" />

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
          {queuedInfo && (
            <>
              {" "}
              (Sem conexão/webhook indisponível: enviaremos automaticamente ao
              restabelecer.)
            </>
          )}
        </p>
      )}
      {err && <p className="mt-3 text-red-400">{err}</p>}

      <p className="mt-4 text-xs text-muted">
        Ao continuar, você concorda com nossos{" "}
        <a href="/termos.html" className="underline">
          Termos
        </a>{" "}
        e{" "}
        <a href="/privacidade.html" className="underline">
          Privacidade
        </a>
        .
      </p>
    </div>
  );
}
