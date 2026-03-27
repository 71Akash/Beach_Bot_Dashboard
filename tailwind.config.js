/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0F172A",
        panel: "#1E293B",
        border: "#334155",
        primary: "#3B82F6",
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        text: "#E2E8F0",
        muted: "#94A3B8",
      },
      boxShadow: {
        panel: "0 8px 24px rgba(0,0,0,0.25)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
}