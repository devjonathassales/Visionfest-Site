import React, { useState } from "react";
import { track } from "../lib/analytics";

export default function LeadForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const utm = JSON.parse(localStorage.getItem("utm") || "{}");
      Object.assign(data, utm);
    } catch (_) {}

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Falha ao enviar");
      setOk(true);
      track("form_submit");
      e.currentTarget.reset();
    } catch (e) {
      setErr("Não foi possível enviar. Tente novamente.");
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
          placeholder="WhatsApp"
          className="px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        />
        <textarea
          name="mensagem"
          placeholder="Fale rapidamente sobre sua operação"
          className="md:col-span-2 px-4 py-3 rounded-xl border border-subtle bg-transparent text-default focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)]"
        ></textarea>

        {/* Texto alterado do botão */}
        <button
          disabled={loading}
          className="md:col-span-2 px-6 py-3 rounded-full bg-[var(--brand-green)] text-black font-semibold hover:translate-y-[-1px] transition"
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
