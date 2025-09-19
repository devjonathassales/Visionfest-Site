// src/lib/whatsapp.js
// Gera URL do WhatsApp com mensagem customizável e fallbacks robustos.
// Agora sem encode manual (evita mensagem aparecer codificada no WhatsApp).

// ENVs
const RAW_PHONE_ENV = String(
  (import.meta &&
    import.meta.env &&
    import.meta.env.VITE_WHATSAPP_ACOLHIMENTO) ||
    ""
).trim();

// Apenas dígitos
const ENV_PHONE = RAW_PHONE_ENV.replace(/\D/g, "");

// Fallback final de telefone
const FALLBACK_PHONE = "5585996451221";

// Mensagens
const DEFAULT_MSG = "Olá! Vim pelo site Visionfest.";
const ENV_MSG = String(
  (import.meta &&
    import.meta.env &&
    import.meta.env.VITE_WHATSAPP_ACOLHIMENTO_MSG) ||
    DEFAULT_MSG
);

/** retorna um telefone válido */
function getPhone() {
  if (ENV_PHONE && ENV_PHONE.length >= 10) return ENV_PHONE;
  return FALLBACK_PHONE;
}

/**
 * Monta URL canônica da API Web do WhatsApp.
 * Prioridade da mensagem: opts.text > ENV_MSG > DEFAULT_MSG
 *
 * @param {Object} [opts]
 * @param {string} [opts.text] Mensagem customizada para este CTA.
 * @param {Record<string,string|number|boolean>} [opts.extraParams] Parâmetros extras (UTMs etc.)
 */
export function whatsAcolhimentoUrl(opts) {
  const options = opts || {};
  const phone = getPhone();

  // Mensagem com prioridade e trim
  let rawText =
    (typeof options.text === "string" && options.text.trim()) ||
    ENV_MSG ||
    DEFAULT_MSG;

  // Usa URLSearchParams para codificar automaticamente (sem encode manual)
  const url = new URL("https://api.whatsapp.com/send");
  if (phone) url.searchParams.set("phone", phone);
  url.searchParams.set("text", rawText);

  // Parâmetros extras (ex.: utm_source, utm_campaign…)
  if (options.extraParams && typeof options.extraParams === "object") {
    for (const [k, v] of Object.entries(options.extraParams)) {
      if (v !== null && v !== undefined && String(v).length > 0) {
        url.searchParams.set(k, String(v));
      }
    }
  }

  return url.toString();
}

/**
 * Handler de clique (opcional) caso prefira usar onClick.
 */
export function handleWhatsClick(label, opts) {
  const analyticsLabel =
    typeof label === "string" && label ? label : "whatsapp_click";
  const options = opts || {};
  return (e) => {
    try {
      e?.preventDefault?.();
    } catch {}
    try {
      if (typeof window !== "undefined" && window.gtag)
        window.gtag("event", "click", { label: analyticsLabel });
    } catch {}
    const url = whatsAcolhimentoUrl(options);
    try {
      window.location.href = url;
    } catch {
      window.open(url, "_self");
    }
  };
}
