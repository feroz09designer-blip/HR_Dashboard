"use client";

import Modal from "@/components/ui/Modal";
import { REPORT_SECTIONS } from "@/data/reportFields";

export default function PreviewModal({ open, onClose, selection }) {
  const grouped = REPORT_SECTIONS.map((s) => ({
    title: s.title,
    fields: s.fields.filter((f) => selection.has(`${s.id}::${f}`)),
  })).filter((s) => s.fields.length > 0);

  const totalSelected = grouped.reduce((acc, s) => acc + s.fields.length, 0);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Preview Report Fields"
      subtitle={`${totalSelected} field${totalSelected === 1 ? "" : "s"} selected across ${grouped.length} section${grouped.length === 1 ? "" : "s"}.`}
    >
      {grouped.length === 0 ? (
        <div className="grid place-items-center rounded-lg border border-dashed border-line py-10 text-[12.5px] text-ink-muted">
          No fields selected yet. Pick some from the report grid.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {grouped.map((s) => (
            <div key={s.title} className="rounded-xl border border-line bg-[#F8FCFF] p-3">
              <div className="mb-2 flex items-center justify-between">
                <h4 className="text-[12.5px] font-semibold text-ink">{s.title}</h4>
                <span className="rounded-full bg-white px-2 py-0.5 text-[10.5px] font-semibold text-brand-blue">
                  {s.fields.length}
                </span>
              </div>
              <ul className="space-y-1">
                {s.fields.map((f) => (
                  <li
                    key={f}
                    className="rounded-md bg-white px-2 py-1.5 text-[12px] text-ink"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
