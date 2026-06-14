"use client";

import Checkbox from "@/components/ui/Checkbox";

export default function ReportFieldCard({
  section,
  selection = new Set(),
  onToggleField,
  onToggleAll,
  searchQuery = "",
}) {
  const filteredFields = searchQuery
    ? section.fields.filter((f) =>
        f.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : section.fields;

  const selectedCount = section.fields.filter((f) => selection.has(f)).length;
  const total = section.fields.length;
  const allSelected = selectedCount === total && total > 0;
  const someSelected = selectedCount > 0 && !allSelected;

  // Hide entire card if nothing matches the search.
  if (searchQuery && filteredFields.length === 0) return null;

  return (
    <div className="flex h-[260px] flex-col overflow-hidden rounded-xl2 border border-line bg-white shadow-card transition hover:border-brand-blue/30 hover:shadow-soft">
      <div className="flex items-start justify-between gap-3 border-b border-line/70 bg-[#F8FCFF] px-4 py-3">
        <div className="min-w-0">
          <div className="truncate text-[12.5px] font-semibold text-ink">
            {section.title}
          </div>
          <div className="mt-0.5 text-[11px] text-ink-muted">
            <span className="font-semibold text-brand-blue">{selectedCount}</span>
            {" / "}
            {total} selected
          </div>
        </div>
        <Checkbox
          checked={allSelected}
          indeterminate={someSelected}
          onChange={() => onToggleAll?.(section, !allSelected)}
        />
      </div>

      <ul className="custom-scroll flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {filteredFields.map((field) => (
          <li key={field}>
            <Checkbox
              checked={selection.has(field)}
              onChange={() => onToggleField?.(section, field)}
              label={field}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
