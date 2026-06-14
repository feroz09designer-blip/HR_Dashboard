"use client";

import { REPORT_SECTIONS } from "@/data/reportFields";

export default function CategoryPills({ activeId, onSelect, allActive, onSelectAll }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onSelectAll}
        className={`rounded-full border px-3.5 py-1.5 text-[11.5px] font-semibold transition ${
          allActive
            ? "border-brand-blue bg-brand-blue text-white shadow-glow"
            : "border-line bg-white text-ink hover:border-brand-blue/40 hover:text-brand-blue"
        }`}
      >
        Select All
      </button>
      {REPORT_SECTIONS.map((s) => {
        const isActive = activeId === s.id;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect?.(s.id)}
            className={`rounded-full border px-3.5 py-1.5 text-[11.5px] font-medium transition ${
              isActive
                ? "border-brand-blue bg-brand-blue text-white shadow-glow"
                : "border-line bg-white text-ink hover:border-brand-blue/40 hover:text-brand-blue"
            }`}
          >
            {s.title}
          </button>
        );
      })}
    </div>
  );
}
