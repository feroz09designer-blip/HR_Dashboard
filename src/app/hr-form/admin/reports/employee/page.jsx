"use client";

import { useMemo, useState } from "react";
import { Download, Eye, RotateCcw, Search } from "lucide-react";

import Layout from "@/components/Layout";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import CategoryPills from "@/components/report/CategoryPills";
import ReportFilters from "@/components/report/ReportFilters";
import ReportFieldCard from "@/components/report/ReportFieldCard";
import PreviewModal from "@/components/report/PreviewModal";
import { REPORT_SECTIONS } from "@/data/reportFields";

/**
 * Selection keys are stored as `${sectionId}::${fieldName}` so the same field
 * label (e.g. "Address") under two different sections stays independent.
 */
const key = (sectionId, field) => `${sectionId}::${field}`;

export default function EmployeeReportPage() {
  const { show } = useToast();

  const [selection, setSelection] = useState(() => new Set());
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [business, setBusiness] = useState("All");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("active");
  const [previewOpen, setPreviewOpen] = useState(false);

  const totalFields = useMemo(
    () => REPORT_SECTIONS.reduce((acc, s) => acc + s.fields.length, 0),
    []
  );
  const selectedCount = selection.size;
  const allActive = selectedCount === totalFields;

  const toggleField = (section, field) => {
    setSelection((prev) => {
      const next = new Set(prev);
      const k = key(section.id, field);
      next.has(k) ? next.delete(k) : next.add(k);
      return next;
    });
  };

  const toggleAllInSection = (section, shouldSelect) => {
    setSelection((prev) => {
      const next = new Set(prev);
      section.fields.forEach((f) => {
        const k = key(section.id, f);
        shouldSelect ? next.add(k) : next.delete(k);
      });
      return next;
    });
  };

  const selectAll = () => {
    if (allActive) {
      setSelection(new Set());
      return;
    }
    const next = new Set();
    REPORT_SECTIONS.forEach((s) =>
      s.fields.forEach((f) => next.add(key(s.id, f)))
    );
    setSelection(next);
  };

  const reset = () => {
    setSelection(new Set());
    setSearch("");
    setActiveCategory(null);
    setBusiness("All");
    setDepartment("All");
    setStatus("active");
  };

  const visibleSections = useMemo(() => {
    if (!activeCategory) return REPORT_SECTIONS;
    return REPORT_SECTIONS.filter((s) => s.id === activeCategory);
  }, [activeCategory]);

  const sectionSelectionFor = (section) =>
    new Set(section.fields.filter((f) => selection.has(key(section.id, f))));

  const handleDownload = () => {
    if (selectedCount === 0) {
      show({
        variant: "info",
        title: "Pick at least one field",
        description: "Select fields from the cards below to generate a report.",
      });
      return;
    }
    show({
      variant: "success",
      title: "Excel report download started",
      description: `${selectedCount} field${selectedCount === 1 ? "" : "s"} included.`,
    });
  };

  return (
    <Layout>
      {/* Page header */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-[20px] font-semibold tracking-tight text-ink">
            Employee Report
          </h1>
          <p className="mt-0.5 text-[12.5px] text-ink-muted">
            Select fields and download customized Excel report
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Fields..."
              className="h-9 w-[220px] rounded-lg border border-line bg-white pl-9 pr-3 text-[12.5px] text-ink shadow-card outline-none transition focus:border-brand-blue/50"
            />
          </div>
          <Button variant="outline" size="md" icon={RotateCcw} onClick={reset}>
            Reset
          </Button>
          <Button
            variant="outline"
            size="md"
            icon={Eye}
            onClick={() => setPreviewOpen(true)}
          >
            Preview
          </Button>
          <Button variant="success" size="md" icon={Download} onClick={handleDownload}>
            Download Excel
          </Button>
        </div>
      </div>

      {/* Category pills */}
      <div className="mt-5 rounded-xl2 border border-line bg-white p-4 shadow-card">
        <CategoryPills
          activeId={activeCategory}
          onSelect={(id) =>
            setActiveCategory((prev) => (prev === id ? null : id))
          }
          allActive={allActive}
          onSelectAll={selectAll}
        />
      </div>

      {/* Filters */}
      <div className="mt-4">
        <ReportFilters
          business={business}
          onBusinessChange={setBusiness}
          department={department}
          onDepartmentChange={setDepartment}
          status={status}
          onStatusChange={setStatus}
        />
      </div>

      {/* Field grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {visibleSections.map((section) => (
          <ReportFieldCard
            key={section.id}
            section={section}
            selection={sectionSelectionFor(section)}
            onToggleField={toggleField}
            onToggleAll={toggleAllInSection}
            searchQuery={search}
          />
        ))}
      </div>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        selection={selection}
      />
    </Layout>
  );
}
