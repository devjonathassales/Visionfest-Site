// src/lib/socials.js
export const socials = {
  instagram:
    import.meta.env.VITE_SOCIAL_INSTAGRAM || "https://instagram.com/visionfest",
  facebook:
    import.meta.env.VITE_SOCIAL_FACEBOOK || "https://facebook.com/visionfest",
  youtube:
    import.meta.env.VITE_SOCIAL_YOUTUBE || "https://youtube.com/@visionfest",
  linkedin:
    import.meta.env.VITE_SOCIAL_LINKEDIN ||
    "https://www.linkedin.com/company/visionfest",
  twitter:
    import.meta.env.VITE_SOCIAL_TWITTER || "https://twitter.com/visionfest",
};

export function socialList() {
  return Object.entries(socials)
    .filter(([, url]) => !!url)
    .map(([k, url]) => ({ key: k, url }));
}
