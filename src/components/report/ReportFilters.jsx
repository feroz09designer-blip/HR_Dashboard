"use client";

import { ChevronDown } from "lucide-react";
import { BUSINESS_OPTIONS, DEPARTMENT_OPTIONS } from "@/data/reportFields";

export default function ReportFilters({
  business,
  onBusinessChange,
  department,
  onDepartmentChange,
  status,
  onStatusChange,
}) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-xl2 border border-line bg-white px-4 py-3 shadow-card">
      <Field label="Business">
        <SelectShell>
          <select
            value={business}
            onChange={(e) => onBusinessChange?.(e.target.value)}
            className="w-full appearance-none bg-transparent pr-6 text-[12.5px] text-ink outline-none"
          >
            {BUSINESS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted"
          />
        </SelectShell>
      </Field>

      <Field label="Department">
        <SelectShell>
          <select
            value={department}
            onChange={(e) => onDepartmentChange?.(e.target.value)}
            className="w-full appearance-none bg-transparent pr-6 text-[12.5px] text-ink outline-none"
          >
            {DEPARTMENT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-ink-muted"
          />
        </SelectShell>
      </Field>

      <Field label="Status">
        <div className="flex items-center gap-4 pt-[6px]">
          <RadioPill
            label="Active"
            checked={status === "active"}
            onChange={() => onStatusChange?.("active")}
          />
          <RadioPill
            label="Inactive"
            checked={status === "inactive"}
            onChange={() => onStatusChange?.("inactive")}
          />
        </div>
      </Field>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10.5px] font-semibold uppercase tracking-wide text-ink-muted">
        {label}
      </span>
      {children}
    </div>
  );
}

function SelectShell({ children }) {
  return (
    <div className="relative flex h-9 min-w-[200px] items-center rounded-lg border border-line bg-white px-3 shadow-card transition focus-within:border-brand-blue/40">
      {children}
    </div>
  );
}

function RadioPill({ label, checked, onChange }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <span
        className={`grid h-[15px] w-[15px] place-items-center rounded-full border transition ${
          checked ? "border-brand-blue" : "border-line"
        }`}
      >
        <span
          className={`h-[7px] w-[7px] rounded-full transition ${
            checked ? "bg-brand-blue" : "bg-transparent"
          }`}
        />
      </span>
      <span className="text-[12.5px] text-ink">{label}</span>
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
    </label>
  );
}
