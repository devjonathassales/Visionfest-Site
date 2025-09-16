import React from "react";
import { Instagram, Facebook, Youtube, Linkedin, Twitter } from "lucide-react";
import { socialList } from "../lib/socials";

const ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function SocialBar({ className = "", size = "md" }) {
  const items = socialList();
  const sizes = {
    sm: "h-9 w-9 text-base",
    md: "h-10 w-10 text-[18px]",
    lg: "h-11 w-11 text-[20px]",
  };
  const s = sizes[size] || sizes.md;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map(({ key, url }) => {
        const Icon = ICONS[key];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visitar nosso ${key}`}
            className={`
              ${s} rounded-full glass border-subtle inline-flex items-center justify-center
              transition hover:-translate-y-0.5
              hover:border-[var(--brand-green)] hover:text-black hover:bg-[var(--brand-green)]
              focus:outline-none
            `}
          >
            <Icon className="shrink-0" />
          </a>
        );
      })}
    </div>
  );
}
