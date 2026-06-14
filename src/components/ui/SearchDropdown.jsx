"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

export default function SearchDropdown({
  value,
  onChange,
  options = [],
  placeholder = "Search...",
  className = "",
  width = "w-64",
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const selected = options.find((o) => o.id === value);
  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={ref} className={`relative ${width} ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-line bg-white px-3 py-2 text-left text-[12.5px] text-ink shadow-card transition hover:border-brand-blue/40"
      >
        <span className={selected ? "text-ink" : "text-ink-muted"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown size={14} className="text-ink-muted" />
      </button>

      {open && (
        <div className="absolute right-0 z-20 mt-1.5 w-full overflow-hidden rounded-lg border border-line bg-white shadow-soft">
          <div className="flex items-center gap-2 border-b border-line/70 px-3 py-2">
            <Search size={13} className="text-ink-muted" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full bg-transparent text-[12.5px] outline-none placeholder:text-ink-muted"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto py-1">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-[12px] text-ink-muted">No matches</li>
            )}
            {filtered.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => {
                    onChange?.(o.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`flex w-full items-center justify-between px-3 py-2 text-left text-[12.5px] transition hover:bg-canvas ${
                    o.id === value ? "text-brand-blue" : "text-ink"
                  }`}
                >
                  <span>{o.label}</span>
                  {o.id === value && (
                    <span className="text-[10px] font-semibold text-brand-blue">
                      SELECTED
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
