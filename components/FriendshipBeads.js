"use client";
import { motion } from "framer-motion";

const BEAD_COLORS = [
  "bg-candy-pink border-candy-pink-dark",
  "bg-candy-mint border-candy-mint-dark",
  "bg-candy-lemon border-candy-lemon-dark",
  "bg-candy-lavender border-candy-lavender-dark",
  "bg-candy-orange border-candy-orange-dark",
];

/**
 * A single string of beads that slides in from one side.
 * tilt     – degrees to rotate the whole string
 * offsetX  – horizontal nudge (px) for the messy offset look
 * beadSize – diameter of each bead (px)
 * fontSize – text size inside each bead (px)
 * colorOffset – which color to start from in the palette
 * delayBase   – animation start delay (s)
 * slideDir    – 1 = slide from right, -1 = slide from left
 */
function BeadString({ word, tilt, offsetX = 0, beadSize, fontSize, colorOffset = 0, delayBase = 0, slideDir = -1 }) {
  const chars = word.split("");
  const half = Math.round(beadSize / 2);

  return (
    <div
      className="relative flex items-center"
      style={{ transform: `rotate(${tilt}deg)`, marginLeft: offsetX, width: "fit-content" }}
    >
      {/* String line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.35, delay: delayBase, ease: "easeOut" }}
        className="absolute left-0 right-0 origin-left"
        style={{
          top: "50%",
          height: 5,
          marginTop: -2,
          background: "linear-gradient(90deg, #C9B8E8, #F2A7BB, #A8DDD5, #F5E6A3, #F4B58A, #C9B8E8)",
          borderRadius: 4,
        }}
      />

      {/* Beads */}
      <div className="relative flex items-center gap-1.5">
        {chars.map((char, i) => {
          const colorClass = BEAD_COLORS[(i + colorOffset) % BEAD_COLORS.length];
          return (
            <motion.div
              key={i}
              initial={{ x: slideDir * (80 + i * 10), opacity: 0, scale: 0.5 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{
                delay: delayBase + i * 0.065,
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.85,
              }}
              whileHover={{ scale: 1.15, rotate: 6 }}
              className={`
                relative flex-shrink-0 rounded-full flex items-center justify-center
                ${colorClass} border-2 border-solid
                font-mono font-black text-charcoal
                cursor-default select-none z-10
              `}
              style={{
                width: beadSize,
                height: beadSize,
                fontSize: fontSize,
                boxShadow: "3px 3px 0px 0px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              {/* Sheen */}
              <div
                className="absolute rounded-full bg-white opacity-40 pointer-events-none"
                style={{ top: Math.round(beadSize * 0.12), left: Math.round(beadSize * 0.2), width: Math.round(beadSize * 0.3), height: Math.round(beadSize * 0.18) }}
              />
              {char}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default function FriendshipBeads() {
  return (
    <div className="flex flex-col gap-2 py-2">
      {/* "NICOLE" — slides from left, tilted slightly up-left */}
      <BeadString
        word="NICOLE"
        tilt={-2.5}
        offsetX={0}
        beadSize={68}
        fontSize={20}
        colorOffset={0}
        delayBase={0.15}
        slideDir={-1}
      />
      {/* "FONG" — slides from right, tilted slightly up-right, offset right, smaller */}
      <BeadString
        word="FONG"
        tilt={1.8}
        offsetX={36}
        beadSize={56}
        fontSize={16}
        colorOffset={2}
        delayBase={0.6}
        slideDir={1}
      />
    </div>
  );
}
