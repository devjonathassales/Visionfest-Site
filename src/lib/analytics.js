export function track(event, payload = {}) {
  if (typeof window !== "undefined" && window.fbq) {
    try {
      window.fbq("trackCustom", event, payload);
    } catch (_) {}
  }
  if (typeof window !== "undefined" && window.gtag) {
    try {
      window.gtag("event", event, payload);
    } catch (_) {}
  }
}
