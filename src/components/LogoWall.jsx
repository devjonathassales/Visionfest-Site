import React, { useMemo } from "react";

export default function LogoWall() {
  // Carrega automaticamente todas as imagens (svg/png/jpg) de src/assets/logos
  const logos = useMemo(() => {
    const modules = import.meta.glob(
      "../assets/logos/*.{svg,png,jpg,jpeg,gif,webp}",
      {
        eager: true,
        as: "url",
      }
    );
    return Object.entries(modules).map(([path, url]) => {
      const name =
        path
          .split("/")
          .pop()
          ?.replace(/\.[^.]+$/, "") || "Logo";
      return { src: url, alt: name };
    });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="text-center">
        <p className="text-sm text-gray-600">
          Em breve — empresas que usam Visionfest
        </p>
      </div>

      {logos.length === 0 ? (
        <p className="mt-6 text-center text-gray-500 text-sm"></p>
      ) : (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-center">
          {logos.map((l, i) => (
            <div key={i} className="flex items-center justify-center">
              <img
                src={l.src}
                alt={l.alt}
                className="logo-img max-h-10 w-auto opacity-80 hover:opacity-100 transition"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
