"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, X, Tag } from "lucide-react";

const colorMap = {
  pink:     { bg: "bg-candy-pink",     border: "border-candy-pink-dark",     accent: "text-candy-pink",     glowBg: "bg-candy-pink/10",     shadow: "rgba(196,96,122,0.6)"  },
  mint:     { bg: "bg-candy-mint",     border: "border-candy-mint-dark",     accent: "text-candy-mint",     glowBg: "bg-candy-mint/10",     shadow: "rgba(95,168,157,0.6)"  },
  lemon:    { bg: "bg-candy-lemon",    border: "border-candy-lemon-dark",    accent: "text-candy-lemon",    glowBg: "bg-candy-lemon/10",    shadow: "rgba(201,184,74,0.6)"  },
  lavender: { bg: "bg-candy-lavender", border: "border-candy-lavender-dark", accent: "text-candy-lavender", glowBg: "bg-candy-lavender/10", shadow: "rgba(138,107,190,0.6)" },
  orange:   { bg: "bg-candy-orange",   border: "border-candy-orange-dark",   accent: "text-candy-orange",   glowBg: "bg-candy-orange/10",   shadow: "rgba(212,133,74,0.6)"  },
};

export default function ProjectCard({ project, featured = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const c = colorMap[project.color] || colorMap.pink;

  useEffect(() => {
    if (!modalOpen) return;
    const handler = (e) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [modalOpen]);

  return (
    <>
      {/* Card */}
      <motion.div
        layout
        className={`
          relative cursor-pointer rounded-xl border-2 ${c.border} overflow-hidden group
          ${featured ? "min-h-[220px]" : "min-h-[160px]"}
          hover:-translate-y-1.5 transition-transform duration-200 ease-out
        `}
        style={{ boxShadow: `5px 5px 0px 0px ${c.shadow}` }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setModalOpen(true)}
      >
        {/* Candy wrapper overlay — CSS group-hover slide */}
        <div
          className={`
            absolute inset-0 ${c.bg} crinkle-overlay z-10
            flex flex-col justify-between p-4
            transition-transform duration-300 ease-in-out
            group-hover:translate-x-full
          `}
          style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" }}
        >
          <div className="flex justify-between items-start">
            <span
              className="font-black text-charcoal text-lg leading-tight"
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              {project.title}
            </span>
            <span className="text-charcoal/60 font-mono text-xs">{project.year}</span>
          </div>
          <div className="font-mono text-xs text-charcoal/70 mt-2 line-clamp-2">{project.tagline}</div>
          <div className="flex flex-wrap gap-1 mt-3">
            {project.stack.slice(0, 3).map(t => (
              <span key={t} className="text-[9px] font-mono font-bold bg-black/20 text-charcoal px-2 py-0.5 rounded-full border border-black/20">
                {t}
              </span>
            ))}
          </div>
          {/* Sheen */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
          <div className="absolute top-2 right-6 text-charcoal/30 text-xs font-mono">HOVER TO UNWRAP ↗</div>
        </div>

        {/* Revealed candy (project details) */}
        <div className={`absolute inset-0 ${c.glowBg} flex flex-col justify-between p-4`}>
          <div>
            <div
              className={`font-black ${c.accent} text-lg`}
              style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
            >
              {project.title}
            </div>
            <p className="text-white/70 text-xs mt-1 leading-relaxed line-clamp-3 font-mono">{project.description}</p>
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex flex-wrap gap-1">
              {project.stack.slice(0, 4).map(t => (
                <span key={t} className={`text-[9px] font-mono border ${c.border} ${c.accent} px-1.5 py-0.5 rounded-full`}>
                  {t}
                </span>
              ))}
            </div>
            <span className="text-white/40 text-[10px] font-mono">Click for more →</span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: "blur(8px)", background: "rgba(18,18,18,0.88)" }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.7, y: 40, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className={`relative max-w-lg w-full rounded-2xl border-2 ${c.border} bg-charcoal p-6`}
              style={{ boxShadow: `8px 8px 0px 0px ${c.shadow}, inset 0 1px 0 rgba(255,255,255,0.1)` }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={14} className="text-white" />
              </button>

              <div
                className={`inline-block px-3 py-1 rounded-full ${c.bg} font-mono font-black text-charcoal text-xs mb-3 border-2 ${c.border}`}
                style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
              >
                {project.year}
              </div>

              <h2
                className={`font-black text-2xl ${c.accent} mb-2`}
                style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
              >
                {project.title}
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-4 font-mono">{project.description}</p>

              <div className="mb-4">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2 flex items-center gap-1">
                  <Tag size={10} /> Tech Stack
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map(t => (
                    <span key={t} className={`text-xs font-mono border-2 ${c.border} ${c.accent} px-2 py-0.5 rounded-full bg-black/30`}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {project.highlights && (
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-2">Highlights</div>
                  <ul className="space-y-1">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex gap-2 text-xs text-white/70 font-mono">
                        <span className={c.accent}>▸</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 flex-wrap">
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ y: -2 }} whileTap={{ y: 1 }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full ${c.bg} border-2 ${c.border} font-mono font-bold text-charcoal text-xs`}
                      style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                    >
                      <Code2 size={13} /> GitHub
                    </motion.div>
                  </a>
                )}
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <motion.div
                      whileHover={{ y: -2 }} whileTap={{ y: 1 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border-2 border-white/20 font-mono font-bold text-white text-xs"
                      style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                    >
                      <ExternalLink size={13} /> Live Demo
                    </motion.div>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
