"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext({ show: () => {} });

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const TONE = {
  success: "border-success/30 text-success",
  error: "border-red-300 text-red-600",
  info: "border-brand-blue/30 text-brand-blue",
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const show = useCallback(({ title, description, variant = "success", duration = 3200 }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed right-5 top-5 z-[60] flex flex-col gap-2">
        {toasts.map((t) => {
          const Icon = ICONS[t.variant] ?? Info;
          return (
            <div
              key={t.id}
              className={`pointer-events-auto flex w-[320px] items-start gap-3 rounded-xl border bg-white px-3.5 py-3 shadow-soft ${TONE[t.variant]}`}
            >
              <Icon size={18} className="mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-[12.5px] font-semibold text-ink">{t.title}</div>
                {t.description && (
                  <div className="mt-0.5 text-[11.5px] text-ink-muted">{t.description}</div>
                )}
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
                className="text-ink-soft hover:text-ink"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
