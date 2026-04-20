"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [clicked, setClicked] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 520, damping: 32, mass: 0.45 });
  const y = useSpring(my, { stiffness: 520, damping: 32, mass: 0.45 });

  useEffect(() => {
    // Only activate on true pointer devices (not touch)
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setVisible(true);

    const onMove = (e) => { mx.set(e.clientX); my.set(e.clientY); };

    const onOver = (e) => {
      setIsPointer(!!e.target.closest("a, button, [role='button'], label, input, textarea, select, [tabindex]"));
    };

    const onDown = () => { setClicked(true); };
    const onUp   = () => { setTimeout(() => setClicked(false), 200); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [mx, my]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{ x, y, marginLeft: -10, marginTop: -9 }}
    >
      <motion.div
        animate={{
          scale: clicked ? 0.65 : isPointer ? 1.5 : 1,
          rotate: isPointer ? 15 : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        <svg viewBox="0 0 100 90" width={20} height={18}>
          <path
            d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z"
            fill={isPointer ? "#C9B8E8" : "#F2A7BB"}
            stroke="rgba(0,0,0,0.55)"
            strokeWidth="4"
          />
          <ellipse cx="31" cy="19" rx="8" ry="4" fill="white" fillOpacity="0.5" transform="rotate(-25 31 19)" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
