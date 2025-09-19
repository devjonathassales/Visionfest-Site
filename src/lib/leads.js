// src/lib/leads.js
const QUEUE_KEY = "vf_lead_queue";

function getWebhookUrl() {
  let fromEnv = "";
  try {
    fromEnv = (import.meta?.env?.VITE_LEADS_WEBHOOK_URL || "")
      .toString()
      .trim();
  } catch {}

  // Fallbacks para DEV/Debug:
  // - window.__VF_WEBHOOK_URL (você pode setar no console)
  // - localStorage["VITE_LEADS_WEBHOOK_URL"] (persistente em dev)
  let fromGlobal = "";
  if (typeof window !== "undefined" && window.__VF_WEBHOOK_URL) {
    try {
      fromGlobal = String(window.__VF_WEBHOOK_URL).trim();
    } catch {}
  }

  let fromLS = "";
  try {
    fromLS = (localStorage.getItem("VITE_LEADS_WEBHOOK_URL") || "").trim();
  } catch {}

  const url = fromEnv || fromGlobal || fromLS;

  // Diagnóstico
  console.debug("[Leads] webhook sources →", {
    fromEnv,
    fromGlobal,
    fromLS,
    picked: url,
  });

  if (!url) {
    console.warn(
      "[Leads] VITE_LEADS_WEBHOOK_URL ausente. " +
        "Defina no .env (raiz do projeto) e reinicie o dev server. " +
        'Ou, para testar agora no DevTools, use: window.__VF_WEBHOOK_URL="https://.../exec"'
    );
  }
  return url;
}

export async function saveLeadToWebhook(payload = {}, opts = {}) {
  const url = getWebhookUrl();
  if (!url) {
    if (!opts.silent) console.warn("[Leads] VITE_LEADS_WEBHOOK_URL ausente.");
    queueLead({ ...payload, reason: "missing_webhook" });
    return {
      ok: false,
      error: "VITE_LEADS_WEBHOOK_URL ausente.",
      queued: true,
    };
  }

  const enriched = {
    ...payload,
    page: typeof location !== "undefined" ? location.href : "",
    ref: typeof document !== "undefined" ? document.referrer : "",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    ts: Date.now(),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      // Se seu Apps Script aceita JSON, prefira application/json e ajuste o doPost.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    });

    if (!res.ok) {
      const text = await safeText(res);
      throw new Error(
        `Webhook HTTP ${res.status} ${res.statusText} :: ${text}`
      );
    }
    return { ok: true };
  } catch (err) {
    if (!opts.silent)
      console.warn("[Leads] falha no envio, vou enfileirar:", err);
    queueLead(enriched);
    return { ok: false, error: String(err), queued: true };
  }
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return "";
  }
}

export function queueLead(payload) {
  try {
    const q = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
    q.push({ payload, ts: Date.now() });
    localStorage.setItem(QUEUE_KEY, JSON.stringify(q));
  } catch (e) {
    console.warn("[Leads] não consegui enfileirar no localStorage:", e);
  }
}

export async function flushQueuedLeads() {
  let q = [];
  try {
    q = JSON.parse(localStorage.getItem(QUEUE_KEY) || "[]");
  } catch {}
  if (!q.length) return { sent: 0, left: 0 };

  const remaining = [];
  for (const item of q) {
    const r = await saveLeadToWebhook(item.payload, { silent: true });
    if (!r.ok) remaining.push(item);
    await new Promise((r) => setTimeout(r, 350)); // evita throttling
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  return { sent: q.length - remaining.length, left: remaining.length };
}
