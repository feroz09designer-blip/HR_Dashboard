export default function InfoField({ label, value }) {
  const hasValue = value && value !== "—";
  const isActive = value === "Active";

  return (
    <div className="flex h-[58px] items-center justify-between gap-3 rounded-xl border border-line bg-[#F6FBFF] px-4 transition hover:border-brand-blue/30 hover:bg-white">
      <span className="text-[11.5px] font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      {isActive ? (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          Active
        </span>
      ) : (
        <span
          className={`text-right text-[12.5px] ${
            hasValue ? "font-semibold text-ink" : "text-ink-soft"
          }`}
        >
          {value || "—"}
        </span>
      )}
    </div>
  );
}
