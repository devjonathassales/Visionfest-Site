// src/lib/seo.js
export function injectJsonLd() {
  if (typeof window === "undefined") return;

  const SITE_URL = import.meta.env.VITE_SITE_URL || window.location.origin;

  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Visionfest",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: [import.meta.env.VITE_INSTAGRAM_URL].filter(Boolean),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Visionfest",
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Visionfest",
    operatingSystem: "Web",
    applicationCategory: "BusinessApplication",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "BRL",
      lowPrice: "179",
      highPrice: "259",
      offerCount: "3",
      url: `${SITE_URL}#precos`,
    },
    description:
      "Sistema de gestão para fornecedores de festas e eventos: orçamentos, contratos, estoque, agenda, financeiro e relatórios.",
    image: [`${SITE_URL}/og-cover.png`],
    url: SITE_URL,
  };

  // FAQPage (gera pares com base no DOM se existir .faq-question/.faq-answer)
  const faqs = Array.from(document.querySelectorAll("[data-faq]"))
    .map((el) => {
      const q = el.querySelector(".faq-question")?.textContent?.trim();
      const a = el.querySelector(".faq-answer")?.textContent?.trim();
      return q && a
        ? {
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          }
        : null;
    })
    .filter(Boolean);

  const faqLd = faqs.length
    ? { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs }
    : null;

  const blocks = [org, website, software, faqLd].filter(Boolean);

  // injeta um único script com múltiplos blocos
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.text = JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
  document.head.appendChild(s);
}
