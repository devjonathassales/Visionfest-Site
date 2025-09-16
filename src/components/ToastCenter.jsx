import React, { useEffect, useState } from "react";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function ToastCenter() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onToast(ev) {
      const { title, message, type = "info", ttl = 4000 } = ev.detail || {};
      const id = Math.random().toString(36).slice(2);
      const t = { id, title, message, type };
      setToasts((arr) => [...arr, t]);
      setTimeout(() => {
        setToasts((arr) => arr.filter((x) => x.id !== id));
      }, ttl);
    }
    window.addEventListener("vf:toast", onToast);
    return () => window.removeEventListener("vf:toast", onToast);
  }, []);

  return (
    <div className="fixed z-[60] bottom-4 right-4 md:right-6 space-y-3 pointer-events-none">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info;
        return (
          <div
            key={t.id}
            className="pointer-events-auto card border-subtle rounded-xl p-4 shadow-soft w-[92vw] max-w-sm"
          >
            <div className="flex items-start gap-3">
              <Icon className="text-[var(--brand-green)] mt-0.5" size={18} />
              <div className="flex-1">
                {t.title && <div className="font-semibold">{t.title}</div>}
                {t.message && (
                  <div className="text-sm text-muted">{t.message}</div>
                )}
              </div>
              <button
                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10"
                onClick={() =>
                  setToasts((arr) => arr.filter((x) => x.id !== t.id))
                }
              >
                <X size={16} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

