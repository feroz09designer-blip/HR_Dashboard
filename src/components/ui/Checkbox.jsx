import { Check, Minus } from "lucide-react";

export default function Checkbox({ checked, indeterminate = false, onChange, label, className = "" }) {
  return (
    <label className={`group inline-flex cursor-pointer items-center gap-2 ${className}`}>
      <span
        className={`relative grid h-[15px] w-[15px] place-items-center rounded-[4px] border transition ${
          checked || indeterminate
            ? "border-brand-blue bg-brand-blue text-white"
            : "border-line bg-white text-transparent group-hover:border-brand-blue/50"
        }`}
        aria-checked={checked}
        role="checkbox"
      >
        {indeterminate ? (
          <Minus size={11} strokeWidth={3} />
        ) : (
          <Check size={11} strokeWidth={3} className={checked ? "opacity-100" : "opacity-0"} />
        )}
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange?.(e.target.checked)}
          className="absolute inset-0 cursor-pointer opacity-0"
        />
      </span>
      {label && <span className="text-[12.5px] text-ink">{label}</span>}
    </label>
  );
}
