export function withUtm(rawUrl, utm = {}) {
  try {
    const url = new URL(rawUrl, window.location.origin);
    const sp = url.searchParams;
    for (const [k, v] of Object.entries(utm)) {
      if (v != null && v !== "") sp.set(`utm_${k}`, v);
    }
    return url.toString();
  } catch {
    
    if (!rawUrl) return rawUrl;
    const q = Object.entries(utm)
      .filter(([, v]) => v != null && v !== "")
      .map(([k, v]) => `utm_${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
      .join("&");
    if (!q) return rawUrl;
    return rawUrl + (rawUrl.includes("?") ? "&" : "?") + q;
  }
}
