const QUEUE_KEY = "vf_lead_queue";

function getWebhookUrl() {
  try {
    return (import.meta.env.VITE_LEADS_WEBHOOK_URL || "").toString().trim();
  } catch {
    return "";
  }
}

function ensureId(p) {
  if (p && p.id) return p.id;
  try {
    return crypto.randomUUID();
  } catch {
    return "id_" + Date.now() + "_" + Math.random().toString(36).slice(2);
  }
}

export async function saveLeadToWebhook(payload = {}, opts = {}) {
  const url = getWebhookUrl();
  if (!url) {
    if (!opts.silent) console.warn("[Leads] VITE_LEADS_WEBHOOK_URL ausente.");
    const withId = { ...payload, id: ensureId(payload) };
    queueLead({ ...withId, reason: "missing_webhook" });
    return {
      ok: false,
      error: "VITE_LEADS_WEBHOOK_URL ausente.",
      queued: true,
    };
  }

  const enriched = {
    ...payload,
    id: ensureId(payload), // **sempre**
    page: typeof location !== "undefined" ? location.href : "",
    ref: typeof document !== "undefined" ? document.referrer : "",
    ua: typeof navigator !== "undefined" ? navigator.userAgent : "",
    ts: Date.now(),
  };

  try {
    // IMPORTANTE: Apps Script não manda CORS por padrão → use no-cors
    const res = await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(enriched),
    });

    // no-cors => status é opaco; considere ok e deixe dedupe no servidor
    return { ok: true };
  } catch (err) {
    if (!opts.silent)
      console.warn("[Leads] falha no envio, vou enfileirar:", err);
    queueLead(enriched);
    return { ok: false, error: String(err), queued: true };
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
    await new Promise((r) => setTimeout(r, 350));
  }
  localStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
  return { sent: q.length - remaining.length, left: remaining.length };
}
