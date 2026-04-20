"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const BOX_TILT = 3;
const BOX_WIDTH = 270;
const CANDY_W = 82;
const LID_H = 52;

// Pre-computed sparkle positions — no Math.random (stable across SSR/hydration)
const SPARKLES = [
  { id: 0, angle: 0,   dist: 88,  color: "#F2A7BB", size: 7, dur: 0.65, delay: 0    },
  { id: 1, angle: 40,  dist: 108, color: "#F5E6A3", size: 5, dur: 0.70, delay: 0.04 },
  { id: 2, angle: 80,  dist: 94,  color: "#A8DDD5", size: 8, dur: 0.60, delay: 0.02 },
  { id: 3, angle: 120, dist: 104, color: "#C9B8E8", size: 5, dur: 0.68, delay: 0.06 },
  { id: 4, angle: 160, dist: 86,  color: "#F4B58A", size: 6, dur: 0.72, delay: 0.03 },
  { id: 5, angle: 200, dist: 100, color: "#F2A7BB", size: 5, dur: 0.63, delay: 0.07 },
  { id: 6, angle: 240, dist: 90,  color: "#F5E6A3", size: 7, dur: 0.67, delay: 0.01 },
  { id: 7, angle: 280, dist: 106, color: "#A8DDD5", size: 5, dur: 0.71, delay: 0.05 },
  { id: 8, angle: 320, dist: 95,  color: "#C9B8E8", size: 6, dur: 0.64, delay: 0.08 },
];

const candyHearts = [
  { id: "github",   label: "GITHUB",   href: "https://github.com/tekkaonigiri",       color: "#A8DDD5", offset: { x: -118, y: -62  }, exitRotate: -155, rotate: -14 },
  { id: "linkedin", label: "LINKEDIN", href: "https://linkedin.com/in/coleng",         color: "#C9B8E8", offset: { x: 8,    y: -100 }, exitRotate:  110, rotate:   5 },
  { id: "email",    label: "EMAIL",    href: "/contact",                               color: "#F4B58A", offset: { x: 118,  y: -62  }, exitRotate:  148, rotate:  16 },
  { id: "resume",   label: "MY CV",    href: "/resume",                                color: "#F5E6A3", offset: { x: -36,  y: -130 }, exitRotate: -120, rotate:  -7 },
];

const MINI_HEARTS = [
  ["BE",   "#F2A7BB"],
  ["MINE", "#C9B8E8"],
  ["XO",   "#A8DDD5"],
  ["YES",  "#F4B58A"],
  ["WOW",  "#F5E6A3"],
];

function CandyHeart({ label, color }) {
  return (
    <svg viewBox="0 0 100 90" width={CANDY_W} height={Math.round(CANDY_W * 0.9)}>
      <path
        d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z"
        fill={color}
        stroke="#000"
        strokeWidth="3.5"
      />
      <ellipse cx="31" cy="19" rx="9" ry="4.5" fill="white" fillOpacity="0.42" transform="rotate(-25 31 19)" />
      <text
        x="50" y="47"
        textAnchor="middle"
        fontFamily="'Courier New', monospace"
        fontWeight="900"
        fontSize={label.length > 6 ? "8.5" : "11"}
        fill="#121212"
        letterSpacing="0.5"
      >
        {label}
      </text>
    </svg>
  );
}

export default function SweetheartBox() {
  const [phase, setPhase] = useState("closed");
  const [sparkleKey, setSparkleKey] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);

  // Auto-open every page load — fires after 2.5 s
  useEffect(() => {
    const t = setTimeout(() => {
      setPhase("opening");
      setTimeout(() => {
        setPhase("open");
        setSparkleKey(k => k + 1);
        setShowSparkles(true);
        setTimeout(() => setShowSparkles(false), 1000);
      }, 580);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("open");
      setSparkleKey(k => k + 1);
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 1000);
    }, 580);
  };

  useEffect(() => {
    if (phase === "open") {
      const t = setTimeout(() => setPhase("exiting"), 5500);
      return () => clearTimeout(t);
    }
    if (phase === "exiting") {
      const t = setTimeout(() => setPhase("closing"), 720);
      return () => clearTimeout(t);
    }
    if (phase === "closing") {
      const t = setTimeout(() => setPhase("closed"), 680);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const flapOpen    = ["opening", "open", "exiting"].includes(phase);
  const showCandies = ["open", "exiting"].includes(phase);
  const falling     = phase === "exiting";

  return (
    <div className="relative select-none" style={{ paddingTop: 80, paddingLeft: 36, paddingRight: 36, paddingBottom: 24 }}>

      {/* ── GLOW behind box — blooms when open ── */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          inset: "-30px",
          background: "radial-gradient(ellipse 80% 70% at 50% 60%, rgba(242,167,187,0.30) 0%, rgba(201,184,232,0.16) 45%, transparent 70%)",
          filter: "blur(30px)",
          borderRadius: "32px",
        }}
        animate={{ opacity: flapOpen ? 1 : 0 }}
        transition={{ duration: 0.55 }}
      />

      {/* ── TILTED BOX WRAPPER ── */}
      <motion.div
        className="relative cursor-pointer"
        style={{ width: BOX_WIDTH }}
        initial={{ rotate: BOX_TILT }}
        animate={
          phase === "closed"
            ? { rotate: [BOX_TILT, BOX_TILT + 1.3, BOX_TILT - 1.3, BOX_TILT + 0.8, BOX_TILT - 0.4, BOX_TILT] }
            : { rotate: BOX_TILT }
        }
        transition={
          phase === "closed"
            ? { duration: 0.36, repeat: Infinity, repeatDelay: 3.6, ease: "easeInOut" }
            : { duration: 0.18 }
        }
        onClick={handleClick}
      >

        {/* ── SPARKLE BURST at lid center ── */}
        <AnimatePresence>
          {showSparkles && (
            <div
              key={sparkleKey}
              style={{
                position: "absolute",
                top: LID_H / 2,
                left: "50%",
                width: 0,
                height: 0,
                zIndex: 50,
                overflow: "visible",
                pointerEvents: "none",
              }}
            >
              {SPARKLES.map(s => {
                const rad = (s.angle * Math.PI) / 180;
                return (
                  <motion.div
                    key={s.id}
                    style={{ position: "absolute" }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: Math.cos(rad) * s.dist,
                      y: Math.sin(rad) * s.dist,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: s.dur, delay: s.delay, ease: "easeOut" }}
                  >
                    <div
                      style={{
                        width: s.size,
                        height: s.size,
                        borderRadius: "50%",
                        background: s.color,
                        boxShadow: `0 0 ${s.size * 2}px ${s.color}`,
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

        {/* ── CANDY HEARTS: anchor at lid/body junction ── */}
        <div
          style={{
            position: "absolute",
            top: LID_H,
            left: "50%",
            width: 0,
            height: 0,
            zIndex: 40,
            overflow: "visible",
            pointerEvents: falling ? "none" : "auto",
          }}
        >
          <AnimatePresence>
            {showCandies && candyHearts.map((candy, i) => {
              const isInternal = candy.href.startsWith("/");
              const cx = candy.offset.x - CANDY_W / 2;
              const cy = candy.offset.y - Math.round(CANDY_W * 0.9) / 2;

              return (
                <motion.div
                  key={candy.id}
                  style={{ position: "absolute" }}
                  initial={{ x: -CANDY_W / 2, y: 8, scale: 0.18, opacity: 0, rotate: 0 }}
                  animate={
                    falling
                      ? { x: cx, y: 460, scale: 0.3, opacity: 0, rotate: candy.exitRotate }
                      : { x: cx, y: cy, scale: 1, opacity: 1, rotate: candy.rotate }
                  }
                  transition={
                    falling
                      ? { delay: i * 0.07, duration: 0.65, ease: [0.42, 0, 1, 1] }
                      : { delay: i * 0.12, type: "spring", stiffness: 270, damping: 13 }
                  }
                  exit={{ opacity: 0, scale: 0, transition: { duration: 0.1 } }}
                >
                  {/* Floating bounce — gentle oscillation while stationary */}
                  <motion.div
                    animate={!falling ? { y: [0, -6, 0] } : { y: 0 }}
                    transition={{
                      duration: 1.8 + i * 0.25,
                      repeat: !falling ? Infinity : 0,
                      ease: "easeInOut",
                      delay: 0.6 + i * 0.15,
                    }}
                  >
                    {isInternal ? (
                      <Link href={candy.href} onClick={e => e.stopPropagation()}>
                        <motion.div whileHover={{ scale: 1.12, rotate: 0 }} whileTap={{ scale: 0.88 }}>
                          <CandyHeart label={candy.label} color={candy.color} />
                        </motion.div>
                      </Link>
                    ) : (
                      <a href={candy.href} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()}>
                        <motion.div whileHover={{ scale: 1.12, rotate: 0 }} whileTap={{ scale: 0.88 }}>
                          <CandyHeart label={candy.label} color={candy.color} />
                        </motion.div>
                      </a>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* ── LID ── */}
        <div style={{ perspective: "700px", height: LID_H }}>
          <motion.div
            animate={flapOpen ? { rotateX: -164 } : { rotateX: 0 }}
            transition={{ type: "spring", stiffness: 195, damping: 23 }}
            style={{ transformOrigin: "top center", height: LID_H }}
            className="relative w-full rounded-t-xl border-2 border-b-0 border-black flex items-center justify-between px-4 overflow-hidden"
          >
            <div
              className="absolute inset-0 rounded-t-xl"
              style={{ background: "linear-gradient(180deg, #8B2252 0%, #6B1640 100%)" }}
            />
            <span className="relative font-mono text-[9px] font-black text-white/65 tracking-widest z-10">NET WT</span>
            <div className="relative w-14 h-1 rounded-full bg-white/20 z-10" />
            <span className="relative font-mono text-[9px] font-black text-white/65 tracking-widest z-10">0.9 OZ</span>
            <div className="absolute inset-0 rounded-t-xl bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* ── BOX BODY ── */}
        <div
          className="relative w-full rounded-b-xl border-2 border-t-0 border-black overflow-hidden"
          style={{
            background: "linear-gradient(160deg, #7A1F4A 0%, #601535 55%, #4A0E28 100%)",
            boxShadow: "6px 6px 0px 0px rgba(0,0,0,1), 0 0 32px rgba(242,167,187,0.12)",
            height: 272,
          }}
        >
          {/* "The Original!" strip */}
          <div className="bg-white/10 border-b border-white/15 px-3 py-1.5 text-center">
            <span className="font-mono text-[11px] italic text-white/90 tracking-wider">The Original!</span>
          </div>

          {/* SWEETHEARTS title */}
          <div className="px-2 pt-2 text-center">
            <div
              className="font-mono font-black text-white tracking-wide leading-none"
              style={{ fontSize: 30, textShadow: "2px 2px 0px rgba(0,0,0,0.5), 0 0 32px rgba(255,160,160,0.2)" }}
            >
              Sweethearts
            </div>
            <div className="font-mono text-[10px] text-white/70 tracking-[0.4em] uppercase mt-0.5">Candies</div>
          </div>

          {/* Center heart */}
          <div className="flex justify-center mt-2">
            <svg viewBox="0 0 100 90" width={96} height={86}>
              <path d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z" fill="#F5E6A3" stroke="#000" strokeWidth="3" />
              <ellipse cx="28" cy="18" rx="10" ry="5" fill="white" fillOpacity="0.35" transform="rotate(-25 28 18)" />
              <text x="50" y="38" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="12" fill="#4A0E28">CUTIE</text>
              <text x="50" y="54" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="900" fontSize="12" fill="#4A0E28">PIE</text>
            </svg>
          </div>

          {/* Mini candy hearts row */}
          <div className="flex justify-center gap-1.5 px-3 mt-2">
            {MINI_HEARTS.map(([text, color]) => (
              <svg key={text} viewBox="0 0 100 90" width={30} height={27}>
                <path d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z" fill={color} stroke="#000" strokeWidth="5" />
                <text x="50" y="47" textAnchor="middle" fontFamily="'Courier New', monospace" fontWeight="900" fontSize={text.length > 2 ? "18" : "22"} fill="#121212">{text}</text>
              </svg>
            ))}
          </div>

          {/* Bottom weight */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <span className="font-mono text-[9px] text-white/50 tracking-widest">NET WT 0.9 OZ (26g)</span>
          </div>

          {/* Shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-black/15 pointer-events-none" />

          {/* Click hint — more visible, bounces gently */}
          <AnimatePresence>
            {phase === "closed" && (
              <motion.div
                key="hint"
                className="absolute inset-0 flex items-end justify-center pb-8 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="font-mono text-[11px] text-candy-pink font-black tracking-wider drop-shadow-sm">
                    ✦ tap to open ✦
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
