"use client";

export const PROFILE_TABS = [
  "Employment Information",
  "Personal Details",
  "Address",
  "Identify & Family Status",
  "Education",
  "Previous Experience",
  "Leave Balance",
  "Job Progress",
];

export default function Tabs({ active, onChange }) {
  return (
    <div className="rounded-2xl border border-line bg-white p-1.5 shadow-card">
      <div className="custom-scroll flex w-full gap-1 overflow-x-auto">
        {PROFILE_TABS.map((tab) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              onClick={() => onChange?.(tab)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-[12px] font-semibold transition ${
                isActive
                  ? "bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-glow"
                  : "text-ink-muted hover:bg-canvas hover:text-ink"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </div>
  );
}
