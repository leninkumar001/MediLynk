/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            DEFAULT: "#0f172a",
            light: "#1e293b",
            dark: "#020617",
          },
          blue: {
            DEFAULT: "#3b82f6",
            light: "#60a5fa",
            dark: "#1d4ed8",
            electric: "#2563eb",
          },
          cyan: {
            DEFAULT: "#06b6d4",
            light: "#22d3ee",
            dark: "#0891b2",
            aqua: "#00f5ff",
          },
          emerald: {
            DEFAULT: "#10b981",
            light: "#34d399",
            dark: "#047857",
          },
        },
      },
      fontFamily: {
        sans: ["Inter", "Outfit", "system-ui", "sans-serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-slow": "glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        glow: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
}
