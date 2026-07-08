/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg:     "var(--bg)",
        raised: "var(--bg-raised)",
        ink:    { DEFAULT: "var(--ink)", 2: "var(--ink-2)", 3: "var(--ink-3)" },
        rule:   "var(--rule)",
        accent: {
          DEFAULT: "var(--accent)",
          strong:  "var(--accent-strong)",
          wash:    "var(--accent-wash)",
        },
        ok: "var(--ok)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "Arial", "sans-serif"],
        mono:    ["var(--font-mono)", "'Courier New'", "monospace"],
      },
      maxWidth: {
        page:  "1080px",
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
