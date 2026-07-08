"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // Theme is applied pre-paint by the inline script in the root layout;
  // read it after mount so server and client markup match.
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "light");

    // Sync theme changes made in another tab/window of the site
    const onStorage = (e) => {
      if (e.key === "theme" && (e.newValue === "light" || e.newValue === "dark")) {
        document.documentElement.setAttribute("data-theme", e.newValue);
        setTheme(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className="p-1 text-ink-3 hover:text-ink transition-colors duration-150"
    >
      {/* Icon reflects the CURRENT theme: sun = light active, moon = dark active.
          Reserve the icon's box before mount to avoid layout shift. */}
      {theme === null ? (
        <span className="block w-4 h-4" />
      ) : theme === "dark" ? (
        <Moon size={16} />
      ) : (
        <Sun size={16} />
      )}
    </button>
  );
}
