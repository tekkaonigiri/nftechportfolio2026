"use client";
import { motion } from "framer-motion";

const colorMap = {
  "candy-pink":     { bg: "bg-candy-pink/10",     border: "border-candy-pink",     accent: "text-candy-pink",     shadow: "rgba(242,167,187,0.55)" },
  "candy-mint":     { bg: "bg-candy-mint/10",     border: "border-candy-mint",     accent: "text-candy-mint",     shadow: "rgba(168,221,213,0.55)" },
  "candy-lemon":    { bg: "bg-candy-lemon/10",    border: "border-candy-lemon",    accent: "text-candy-lemon",    shadow: "rgba(245,230,163,0.55)" },
  "candy-lavender": { bg: "bg-candy-lavender/10", border: "border-candy-lavender", accent: "text-candy-lavender", shadow: "rgba(201,184,232,0.55)" },
  "candy-orange":   { bg: "bg-candy-orange/10",   border: "border-candy-orange",   accent: "text-candy-orange",   shadow: "rgba(244,181,138,0.55)" },
};

export default function ExperienceCard({ role, company, period, bullets, color = "candy-pink", delay = 0 }) {
  const c = colorMap[color] || colorMap["candy-pink"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 22 }}
      className={`
        relative p-5 rounded-xl border-2 ${c.border} ${c.bg}
        glass-candy
        hover:-translate-y-1.5 transition-transform duration-200 ease-out
      `}
      style={{ boxShadow: `5px 5px 0px 0px ${c.shadow}` }}
    >
      {/* Plastic sheen */}
      <div className="absolute top-0 left-0 right-0 h-8 rounded-t-xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      <div className="flex justify-between items-start mb-1 flex-wrap gap-1">
        <h3
          className={`font-black text-white text-base leading-tight ${c.accent}`}
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          {role}
        </h3>
        <span className={`font-mono text-xs ${c.accent} bg-black/30 px-2 py-0.5 rounded-full border border-current`}>
          {period}
        </span>
      </div>
      <div className={`font-mono text-sm ${c.accent} mb-3 opacity-70`}>{company}</div>

      <ul className="space-y-1.5">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-xs text-white/65 leading-relaxed">
            <span className={`${c.accent} mt-0.5 shrink-0`}>▸</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
