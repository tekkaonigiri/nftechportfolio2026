"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const hearts = [
  { label: "HI!",    color: "#F2A7BB", size: 60,  delay: 0    },
  { label: "I'M",    color: "#A8DDD5", size: 60,  delay: 0.18 },
  { label: "NICOLE", color: "#C9B8E8", size: 74,  delay: 0.36 },
];

export default function LoadingScreen({ onDone }) {
  const [show, setShow] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem("portfolio_loaded")) {
      setDone(true);
      onDone?.();
      return;
    }
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem("portfolio_loaded", "1");
      setDone(true);
      onDone?.();
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && !done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-charcoal flex flex-col items-center justify-center gap-10"
        >
          {/* Candy hearts row */}
          <div className="flex items-end gap-5">
            {hearts.map((h) => {
              const w = h.size;
              const ht = Math.round(h.size * 0.9);
              const fontSize = h.label === "NICOLE" ? 14 : 19;
              return (
                <motion.div
                  key={h.label}
                  initial={{ y: -80, opacity: 0, scale: 0.3, rotate: -12 }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ delay: h.delay, type: "spring", stiffness: 380, damping: 16 }}
                  className="flex flex-col items-center"
                >
                  <svg viewBox="0 0 100 90" width={w} height={ht}>
                    <path
                      d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z"
                      fill={h.color}
                      stroke="rgba(0,0,0,0.55)"
                      strokeWidth="4"
                    />
                    <ellipse
                      cx="31" cy="19" rx="9" ry="5"
                      fill="white" fillOpacity="0.4"
                      transform="rotate(-25 31 19)"
                    />
                    <text
                      x="50" y="50"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={fontSize}
                      fontWeight="900"
                      fontFamily="'Courier New', monospace"
                      fill="#121212"
                      letterSpacing={h.label === "NICOLE" ? "-0.5" : "1"}
                    >
                      {h.label}
                    </text>
                  </svg>
                </motion.div>
              );
            })}
          </div>

          {/* Progress bar */}
          <div className="w-44 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #F2A7BB, #A8DDD5, #C9B8E8, #F5E6A3)",
              }}
            />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-mono text-white/25 text-[11px] tracking-widest uppercase"
          >
            Loading the candy shop…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
