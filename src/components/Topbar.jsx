"use client";

import { LogOut, RefreshCcw } from "lucide-react";
import { CURRENT_USER } from "@/data/user";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 flex h-[64px] items-center justify-between border-b border-line/70 bg-canvas/80 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-[12.5px] font-semibold text-white">
            {CURRENT_USER.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          {CURRENT_USER.online && (
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-canvas bg-success" />
          )}
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-ink">
              {CURRENT_USER.name} ({CURRENT_USER.staffId})
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-success" />
          </div>
          <div className="text-[11.5px] text-ink-muted">{CURRENT_USER.role}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-ink-muted shadow-card transition hover:border-brand-blue/40 hover:text-brand-blue"
          aria-label="Refresh"
        >
          <RefreshCcw size={15} />
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple px-3 py-2 text-[12.5px] font-semibold text-white shadow-glow transition hover:brightness-110"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </header>
  );
}
