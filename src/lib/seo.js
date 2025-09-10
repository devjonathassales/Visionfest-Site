export function injectJsonLd() {
  if (typeof window === "undefined") return;
  const existing = document.getElementById("jsonld-software");
  if (existing) return;

  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Visionfest",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Gestão completa para fornecedores de festas e eventos.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = "jsonld-software";
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}
