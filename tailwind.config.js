/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: "#00172B",
          dark: "#000F1F",
          hover: "#012842",
        },
        brand: {
          blue: "#006BFF",
          blueDark: "#0F6FFF",
          purple: "#6366F1",
        },
        canvas: "#EFFBFF",
        surface: "#FFFFFF",
        ink: {
          DEFAULT: "#071B34",
          muted: "#64748B",
          soft: "#94A3B8",
        },
        line: "#DCEAF2",
        success: "#16A34A",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(7, 27, 52, 0.04), 0 1px 3px rgba(7, 27, 52, 0.06)",
        soft: "0 6px 24px rgba(7, 27, 52, 0.06)",
        glow: "0 8px 24px rgba(0, 107, 255, 0.25)",
      },
      borderRadius: {
        xl2: "14px",
      },
    },
  },
  plugins: [],
};
