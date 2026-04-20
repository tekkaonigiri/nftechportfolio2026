"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "HOME",  href: "/",        color: "#F2A7BB" },
  { label: "WORK",  href: "/projects", color: "#A8DDD5" },
  { label: "CV",    href: "/resume",   color: "#F5E6A3" },
  { label: "HELLO", href: "/contact",  color: "#C9B8E8" },
];

function NavHeart({ label, color, isActive }) {
  // Scale: SVG 100×92 rendered at 80×74 → 0.8x
  // fontSize in SVG units * 0.8 = rendered px
  // Target: ≥11px rendered → fontSize ≥ 14 SVG units
  const fontSize = label.length >= 5 ? 13 : label.length >= 4 ? 15 : 20;
  const letterSpacing = label.length >= 5 ? "-0.5" : "0.5";

  return (
    <svg viewBox="0 0 100 92" width={80} height={74}>
      <path
        d="M50,79 C50,79 7,53 7,27 C7,11 18,4 28,4 C37,4 44,10 50,20 C56,10 63,4 72,4 C82,4 93,11 93,27 C93,53 50,79 50,79Z"
        fill={color}
        stroke="#000"
        strokeWidth="3.5"
      />
      {isActive && (
        <path
          d="M50,79 C50,79 7,53 7,27 C7,11 18,4 28,4 C37,4 44,10 50,20 C56,10 63,4 72,4 C82,4 93,11 93,27 C93,53 50,79 50,79Z"
          fill="rgba(0,0,0,0.18)"
        />
      )}
      {/* Shine */}
      <ellipse
        cx="30" cy="20" rx="9" ry="4.5"
        fill="white" fillOpacity="0.38"
        transform="rotate(-22 30 20)"
      />
      <text
        x="50"
        y="48"
        textAnchor="middle"
        fontFamily="'Courier New', monospace"
        fontWeight="900"
        fontSize={fontSize}
        fill="#121212"
        letterSpacing={letterSpacing}
      >
        {label}
      </text>
    </svg>
  );
}

export default function CandyNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-4 right-4 z-50 flex gap-2">
      {navItems.map((item, i) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
              whileHover={{ y: -4 }}
              whileTap={{ y: 2, scale: 0.93 }}
              style={{
                filter: isActive
                  ? "drop-shadow(1px 1px 0px black)"
                  : "drop-shadow(4px 4px 0px black)",
                cursor: "pointer",
                display: "block",
              }}
            >
              <NavHeart label={item.label} color={item.color} isActive={isActive} />
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
