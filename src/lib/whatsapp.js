function digitsOnly(s = "") {
  return String(s).replace(/\D/g, "");
}

export function whatsAcolhimentoUrl() {
  const raw = import.meta.env.VITE_WHATSAPP_ACOLHIMENTO || "";
  const msg =
    import.meta.env.VITE_WHATSAPP_ACOLHIMENTO_MSG ||
    "Olá! Vim pelo site Visionfest e quero falar com o acolhimento.";
  if (!raw) return "#contato";
  // Se vier um link completo, usa direto
  if (/^https?:\/\//i.test(raw)) return raw;
  const phone = digitsOnly(raw);
  return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
}

export function whatsVipUrl() {
  const url = import.meta.env.VITE_WHATSAPP_VIP_URL || "";
  return url || "#contato";
}
