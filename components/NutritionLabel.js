"use client";
import { motion } from "framer-motion";

const skills = [
  { name: "TypeScript / JS",   pct: 95, color: "#F2A7BB" },
  { name: "React / Next.js",   pct: 92, color: "#A8DDD5" },
  { name: "Python",            pct: 85, color: "#F5E6A3" },
  { name: "Claude API",        pct: 80, color: "#C9B8E8" },
];

const vibeStats = [
  { label: "Curiosity Drive",   value: "∞",      big: true  },
  { label: "Tea Dependency",    value: "High",   big: false },
  { label: "Side Projects",     value: "Always", big: false },
  { label: "Docs Enthusiast",   value: "✓ True", big: false },
];

export default function NutritionLabel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 20 }}
      className="bg-charcoal border-[5px] border-white/80 w-full font-mono overflow-hidden"
      style={{ boxShadow: "7px 7px 0px 0px rgba(242,167,187,0.65)" }}
    >
      {/* Pink header */}
      <div className="bg-candy-pink px-4 pt-3 pb-2.5 border-b-[7px] border-black">
        <p className="text-[10px] font-bold text-charcoal tracking-[0.22em] uppercase">
          Nutrition Facts
        </p>
        <h2
          className="font-black text-charcoal leading-none tracking-tight mt-1 text-[28px]"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          Developer<br />Profile
        </h2>
      </div>

      {/* Serving info */}
      <div className="px-4 py-2 border-b border-white/15">
        <div className="flex justify-between text-[11px] text-white/55 mb-0.5">
          <span>Serving Size</span>
          <span className="text-white/85 font-bold">1 Engineer</span>
        </div>
        <div className="flex justify-between text-[11px] text-white/55">
          <span>Years Building</span>
          <span className="text-white/85 font-bold">3+</span>
        </div>
      </div>

      {/* Thick divider */}
      <div className="h-3 bg-white/80" />

      {/* Skills */}
      <div className="px-4 py-3">
        <div className="text-[10px] text-white/45 uppercase tracking-widest font-bold mb-2.5">
          % Daily Skill Value
        </div>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.07 }}
            className="mb-2.5"
          >
            <div className="flex justify-between text-[11px] mb-1">
              <span className="text-white/75">{skill.name}</span>
              <span className="font-black" style={{ color: skill.color }}>{skill.pct}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.pct}%` }}
                transition={{ delay: 0.7 + i * 0.07, duration: 0.55, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: skill.color }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Medium divider */}
      <div className="h-2 bg-white/45" />

      {/* Vibe Stats */}
      <div className="px-4 py-3">
        <div className="text-[10px] text-white/45 uppercase tracking-widest font-bold mb-2">
          Vibe Stats
        </div>
        {vibeStats.map((stat, i) => (
          <div
            key={stat.label}
            className="flex justify-between items-center py-1.5 border-b border-white/10"
          >
            <span className="text-[11px] text-white/65">{stat.label}</span>
            {stat.big ? (
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.1, type: "spring", stiffness: 300, damping: 12 }}
                className="font-black text-candy-mint"
                style={{ fontSize: 30, lineHeight: 1 }}
              >
                ∞
              </motion.span>
            ) : (
              <span className="text-[11px] text-candy-mint font-black">{stat.value}</span>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-candy-lavender/12 border-t-2 border-white/10 px-4 py-2">
        <p className="text-[9px] text-white/30 leading-relaxed">
          * Values based on a 2,000 calorie caffeine diet. May vary by deadline pressure.
        </p>
      </div>
    </motion.div>
  );
}
