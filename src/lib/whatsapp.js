const RAW_ENV = (import.meta?.env?.VITE_WHATSAPP_ACOLHIMENTO ?? "")
  .toString()
  .trim();

const ENV_PHONE = RAW_ENV.replace(/\D/g, "");

const FALLBACK_PHONE = "5585996451221";

const DEFAULT_MSG = "Olá! Vim pelo site Visionfest.";
const RAW_MSG = (
  import.meta?.env?.VITE_WHATSAPP_ACOLHIMENTO_MSG ?? DEFAULT_MSG
).toString();

function getPhone() {
  if (ENV_PHONE && ENV_PHONE.length >= 10) return ENV_PHONE;
  return FALLBACK_PHONE;
}

function encodeText(txt) {
  try {
    return encodeURIComponent(txt ?? RAW_MSG);
  } catch {
    return encodeURIComponent(RAW_MSG);
  }
}

function appendUtm(url, utm) {
  if (!utm || typeof utm !== "object") return url;
  try {
    const u = new URL(url);
    for (const [k, v] of Object.entries(utm)) {
      if (v != null && v !== "") {
        u.searchParams.set(`utm_${k}`, String(v));
      }
    }
    return u.toString();
  } catch {
    const extra = Object.entries(utm)
      .filter(([, v]) => v != null && v !== "")
      .map(([k, v]) => `utm_${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    if (!extra) return url;
    return url + (url.includes("?") ? "&" : "?") + extra;
  }
}

export function whatsAcolhimentoUrl(opts = {}) {
  const phone = getPhone();
  const textParam = encodeText(opts.text);

  let base = phone
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${textParam}`
    : `https://api.whatsapp.com/send?text=${textParam}`;

  base = appendUtm(base, opts.utm);

  return base;
}

export function handleWhatsClick(label = "whatsapp_click", opts = {}) {
  return (e) => {
    try {
      e?.preventDefault?.();
    } catch {}

    try {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "click", { label });
      }
    } catch {}

    const url = whatsAcolhimentoUrl(opts);

    try {
      window.location.href = url;
    } catch {
      // fallback final
      window.open(url, "_self");
    }
  };
}
