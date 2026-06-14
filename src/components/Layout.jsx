"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />
      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-300 ${
          collapsed ? "pl-[72px]" : "pl-[190px]"
        }`}
      >
        <Topbar />
        <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
