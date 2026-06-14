"use client";

import { useState } from "react";
import { Briefcase } from "lucide-react";

import Layout from "@/components/Layout";
import SearchDropdown from "@/components/ui/SearchDropdown";
import Breadcrumb from "@/components/profile/Breadcrumb";
import ProfileCard from "@/components/profile/ProfileCard";
import Tabs, { PROFILE_TABS } from "@/components/profile/Tabs";
import InfoField from "@/components/profile/InfoField";
import { EMPLOYEE, EMPLOYEE_SEARCH_OPTIONS } from "@/data/employee";

export default function EmployeeProfilePage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(EMPLOYEE.staffId);
  const [activeTab, setActiveTab] = useState(PROFILE_TABS[0]);

  // In production: fetch employee by selectedEmployeeId. For now we always render
  // the mock EMPLOYEE, since the directory has just one record.
  const employee = EMPLOYEE;

  return (
    <Layout>
      {/* Top row */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1.5">
          <Breadcrumb items={["Employees", "Employee details"]} />
          <h1 className="text-[20px] font-semibold tracking-tight text-ink">
            Employee details
          </h1>
        </div>
        <SearchDropdown
          value={selectedEmployeeId}
          onChange={setSelectedEmployeeId}
          options={EMPLOYEE_SEARCH_OPTIONS}
          placeholder="Search employee..."
          width="w-[260px]"
        />
      </div>

      {/* Two-column layout */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-[300px_1fr]">
        <ProfileCard employee={employee} />

        <div className="space-y-5">
          <Tabs active={activeTab} onChange={setActiveTab} />

          <section className="rounded-2xl border border-line bg-gradient-to-b from-white to-[#F4FBFF] p-5 shadow-card">
            <div className="mb-5 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
                <Briefcase size={16} />
              </span>
              <div>
                <h3 className="text-[14px] font-semibold text-ink">
                  Employment Related Information
                </h3>
                <p className="text-[11.5px] text-ink-muted">
                  Read-only details synced from the HR master record.
                </p>
              </div>
            </div>

            {activeTab === "Employment Information" ? (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-3">
                  {employee.employment.left.map((f) => (
                    <InfoField key={f.label} label={f.label} value={f.value} />
                  ))}
                </div>
                <div className="space-y-3">
                  {employee.employment.right.map((f) => (
                    <InfoField key={f.label} label={f.label} value={f.value} />
                  ))}
                </div>
              </div>
            ) : (
              <EmptyTab tab={activeTab} />
            )}
          </section>
        </div>
      </div>
    </Layout>
  );
}

function EmptyTab({ tab }) {
  return (
    <div className="grid place-items-center rounded-xl border border-dashed border-line bg-white/60 py-16 text-center">
      <div>
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
          <Briefcase size={20} />
        </div>
        <h4 className="text-[13.5px] font-semibold text-ink">{tab}</h4>
        <p className="mt-1 max-w-sm text-[12px] text-ink-muted">
          This section will load once the {tab.toLowerCase()} API is wired up.
        </p>
      </div>
    </div>
  );
}
