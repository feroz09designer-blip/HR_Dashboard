import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-[12px] text-ink-muted"
    >
      <Home size={13} className="text-ink-muted" />
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center gap-1.5">
          <ChevronRight size={12} className="text-ink-soft" />
          <span
            className={
              i === items.length - 1 ? "font-medium text-ink" : "text-ink-muted"
            }
          >
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}
