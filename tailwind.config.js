/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: "#121212",
        "candy-pink":          "#F07898",
        "candy-mint":          "#66CECC",
        "candy-lemon":         "#F2D864",
        "candy-lavender":      "#A8B4F4",
        "candy-orange":        "#F4A87C",
        "candy-pink-dark":     "#C04870",
        "candy-mint-dark":     "#389896",
        "candy-lemon-dark":    "#C09820",
        "candy-lavender-dark": "#5060CC",
        "candy-orange-dark":   "#C87040",
      },
      fontFamily: {
        mono:    ["var(--font-mono-custom)", "'Space Mono'", "monospace"],
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans:    ["var(--font-sans)", "'DM Sans'", "Arial", "sans-serif"],
      },
      boxShadow: {
        "neo":          "4px 4px 0px 0px rgba(0,0,0,1)",
        "neo-lg":       "6px 6px 0px 0px rgba(0,0,0,1)",
        "neo-sm":       "2px 2px 0px 0px rgba(0,0,0,1)",
        "neo-white":    "4px 4px 0px 0px rgba(255,255,255,0.3)",
        "neo-pink":     "4px 4px 0px 0px #C04870",
        "neo-mint":     "4px 4px 0px 0px #389896",
        "neo-lemon":    "4px 4px 0px 0px #C09820",
        "neo-lavender": "4px 4px 0px 0px #5060CC",
        "neo-orange":   "4px 4px 0px 0px #C87040",
      },
      keyframes: {
        "bead-in": {
          "0%": { transform: "translateY(-60px) scale(0)", opacity: "0" },
          "60%": { transform: "translateY(6px) scale(1.1)", opacity: "1" },
          "80%": { transform: "translateY(-3px) scale(0.95)" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "tumble": {
          "0%": { transform: "translateY(-200px) rotate(0deg)", opacity: "0" },
          "60%": { transform: "translateY(10px) rotate(200deg)", opacity: "1" },
          "80%": { transform: "translateY(-5px) rotate(180deg)" },
          "100%": { transform: "translateY(0) rotate(185deg)", opacity: "1" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "bead-in":    "bead-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "tumble":     "tumble 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "float":      "float 3s ease-in-out infinite",
        "shimmer":    "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
