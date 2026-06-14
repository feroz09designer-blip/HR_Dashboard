"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileBarChart2, UserRound, ChevronLeft } from "lucide-react";

const MENU = [
  {
    key: "employee-report",
    label: "Employee Report",
    href: "/hr-form/admin/reports/employee",
    icon: FileBarChart2,
  },
  {
    key: "employee-profile",
    label: "Employee Profile",
    href: "/hr-form/admin/reports/employee-profile",
    icon: UserRound,
  },
];

export default function Sidebar({ collapsed = false, onToggle }) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 z-30 flex h-screen flex-col bg-sidebar text-white shadow-soft transition-all duration-300 ${
        collapsed ? "w-[72px]" : "w-[190px]"
      }`}
    >
      {/* Logo area */}
      <div className="flex flex-col items-center gap-2 px-4 pb-5 pt-6">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-white shadow-soft">
          <span className="text-lg font-bold tracking-tight text-[#001B2E]">ACI</span>
        </div>
        {!collapsed && (
          <div className="text-center leading-tight">
            <div className="text-[12.5px] font-semibold text-white">
              ACI Application Form
            </div>
            <div className="text-[11px] text-white/60">Admin Panel</div>
          </div>
        )}
      </div>

      <div className="mx-3 h-px bg-white/10" />

      {/* Menu */}
      <nav className="mt-4 flex flex-1 flex-col gap-1 px-3">
        {MENU.map((item) => {
          const Icon = item.icon;
          const active = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.key}
              href={item.href}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[12.5px] font-medium transition-all ${
                active
                  ? "bg-brand-blue text-white shadow-glow"
                  : "text-white/75 hover:bg-sidebar-hover hover:text-white"
              }`}
            >
              <Icon size={16} strokeWidth={2} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom collapse */}
      <div className="border-t border-white/10 bg-sidebar-dark p-3">
        <button
          type="button"
          onClick={onToggle}
          className="flex w-full items-center justify-center rounded-md bg-white/5 py-2 text-white/70 transition hover:bg-white/10 hover:text-white"
          aria-label="Collapse sidebar"
        >
          <ChevronLeft
            size={16}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </button>
      </div>
    </aside>
  );
}
