import { Mail, Phone, User } from "lucide-react";

export default function ProfileCard({ employee }) {
  const initials = employee.name
    .replace(/[^A-Za-z\s]/g, "")
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-white to-[#F4FBFF] shadow-soft">
      <div className="relative h-24 bg-gradient-to-r from-brand-blue/15 via-brand-purple/10 to-brand-blue/5">
        <div className="absolute inset-x-0 -bottom-10 flex justify-center">
          {employee.avatarUrl ? (
            <img
              src={employee.avatarUrl}
              alt={employee.name}
              className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-soft"
            />
          ) : (
            <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-gradient-to-br from-brand-blue to-brand-purple text-[22px] font-semibold text-white shadow-soft">
              {initials || <User size={28} />}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 pb-5 pt-12 text-center">
        <h2 className="text-[15px] font-semibold text-ink">{employee.name}</h2>
        <p className="mt-0.5 text-[12px] text-ink-muted">{employee.designation}</p>
        <span className="mt-3 inline-block rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-brand-blue">
          {employee.badge}
        </span>
      </div>

      <div className="border-t border-line/70 bg-white/60 px-5 py-4">
        <ul className="space-y-2.5">
          {Object.entries(employee.details).map(([k, v]) => {
            const isEmail = k === "EMAIL";
            const isPhone = k === "MOBILE";
            return (
              <li
                key={k}
                className="flex items-start justify-between gap-3 text-[12px]"
              >
                <span className="font-semibold uppercase tracking-wide text-ink-muted">
                  {k}
                </span>
                <span className="flex max-w-[60%] items-center gap-1.5 break-all text-right text-ink">
                  {isEmail && <Mail size={11} className="text-ink-muted" />}
                  {isPhone && <Phone size={11} className="text-ink-muted" />}
                  {v}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
