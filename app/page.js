"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import FriendshipBeads from "@/components/FriendshipBeads";
import NutritionLabel from "@/components/NutritionLabel";
import SweetheartBox from "@/components/SweetheartBox";
import ExperienceCard from "@/components/ExperienceCard";

// ── Ambient floating hearts ────────────────────────────────────────────────
// Pre-computed values — no Math.random to keep SSR/hydration stable
const AMBIENT_HEARTS = [
  { id: 0,  x: 7,  size: 13, dur: 18, delay: 0,    color: "#F2A7BB", opacity: 0.045 },
  { id: 1,  x: 16, size: 10, dur: 22, delay: 3.2,  color: "#A8DDD5", opacity: 0.035 },
  { id: 2,  x: 27, size: 16, dur: 16, delay: 6.5,  color: "#C9B8E8", opacity: 0.040 },
  { id: 3,  x: 36, size: 9,  dur: 20, delay: 1.8,  color: "#F5E6A3", opacity: 0.030 },
  { id: 4,  x: 45, size: 12, dur: 24, delay: 8.4,  color: "#F4B58A", opacity: 0.040 },
  { id: 5,  x: 54, size: 11, dur: 17, delay: 4.1,  color: "#F2A7BB", opacity: 0.035 },
  { id: 6,  x: 63, size: 15, dur: 21, delay: 2.3,  color: "#A8DDD5", opacity: 0.045 },
  { id: 7,  x: 74, size: 9,  dur: 19, delay: 7.6,  color: "#C9B8E8", opacity: 0.030 },
  { id: 8,  x: 82, size: 13, dur: 23, delay: 0.7,  color: "#F5E6A3", opacity: 0.040 },
  { id: 9,  x: 91, size: 10, dur: 15, delay: 5.3,  color: "#F4B58A", opacity: 0.035 },
  { id: 10, x: 31, size: 8,  dur: 25, delay: 10.2, color: "#F2A7BB", opacity: 0.025 },
  { id: 11, x: 58, size: 11, dur: 18, delay: 12.0, color: "#C9B8E8", opacity: 0.030 },
];

// ── Page data ──────────────────────────────────────────────────────────────
const experience = [
  {
    role: "AI/ML Fellow",
    company: "Break Through Tech — Cornell Tech, NY",
    period: "Mar. 2026–Present",
    color: "candy-pink",
    bullets: [
      "Selected for the 2026–27 cohort of a competitive national fellowship focused on building industry-ready technical skills and professional expertise.",
      "Developing applied ML skills alongside engineers from top tech companies; selected from a nationally competitive applicant pool.",
    ],
  },
  {
    role: "Operations Assistant",
    company: "Stealth Company — San Francisco, CA",
    period: "Jan. 2026–Present",
    color: "candy-mint",
    bullets: [
      "Establish ground-truth baselines for model fine-tuning by applying RLHF methods to audit and evaluate model outputs for accuracy and alignment.",
    ],
  },
];

const awards = [
  {
    title: "Best Use of Browser Use",
    event: "ACM DiamondHacks 2026",
    date: "April 2026",
    color: "candy-lemon",
    href: "https://devpost.com/software/straightline",
  },
  {
    title: "\"I've Got 99 Problems, and Triton Mobile is All of Them\"",
    event: "Cognitive NeuroEconomics",
    date: "Dec 2025",
    color: "candy-lavender",
    href: "https://medium.com/cognitive-neuroeconomics/ive-got-99-problems-and-triton-mobile-is-all-of-them-2bb7586287de",
  },
];

const activities = [
  { org: "Association for Computing Machinery", role: "Diamond Staff (AI Events) · AI Projects Mentor ×2", color: "candy-pink"     },
  { org: "Triton Robotics",                    role: "Autonomy Team",                                       color: "candy-mint"     },
  { org: "Triton Engineering Student Council", role: "Co-President · Tech Committee",                       color: "candy-lavender" },
  { org: "Women in Computing",                 role: "Project Teams — Fall 2025",                           color: "candy-lemon"    },
  { org: "Roblox x RBXDev",                   role: "Finance & Website Staff",                             color: "candy-orange"   },
];

const reads = [
  {
    tag: "Paper",
    title: "You Only Look Once: Unified, Real-Time Object Detection",
    note: "Reframes detection as a single regression problem — one pass, real-time results. A shift in how I think about efficiency in model design.",
    href: "https://arxiv.org/pdf/1506.02640",
  },
  {
    tag: "Article",
    title: "Add a cool article or essay",
    note: "Optional note.",
    href: "#",
  },
];

const colorTokens = {
  "candy-pink":     { border: "border-candy-pink",     text: "text-candy-pink",     bg: "bg-candy-pink/10"     },
  "candy-mint":     { border: "border-candy-mint",     text: "text-candy-mint",     bg: "bg-candy-mint/10"     },
  "candy-lemon":    { border: "border-candy-lemon",    text: "text-candy-lemon",    bg: "bg-candy-lemon/10"    },
  "candy-lavender": { border: "border-candy-lavender", text: "text-candy-lavender", bg: "bg-candy-lavender/10" },
  "candy-orange":   { border: "border-candy-orange",   text: "text-candy-orange",   bg: "bg-candy-orange/10"   },
};

const displayFont = { fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" };

export default function Home() {
  return (
    <div className="min-h-screen bg-charcoal">

      {/* ── AMBIENT DRIFTING HEARTS ── fixed, ultra-faint, whole-page texture */}
      <div
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{ zIndex: 0 }}
        aria-hidden="true"
      >
        {AMBIENT_HEARTS.map(h => (
          <motion.div
            key={h.id}
            style={{ position: "absolute", left: `${h.x}%`, bottom: -30 }}
            animate={{ y: -1100 }}
            transition={{
              duration: h.dur,
              delay: h.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg
              viewBox="0 0 100 90"
              width={h.size}
              height={Math.round(h.size * 0.9)}
              style={{ opacity: h.opacity }}
            >
              <path
                d="M50,76 C50,76 8,51 8,27 C8,12 18,5 28,5 C37,5 44,11 50,20 C56,11 63,5 72,5 C82,5 92,12 92,27 C92,51 50,76 50,76Z"
                fill={h.color}
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* ── HERO ── */}
      <section className="relative px-4 sm:px-6 pt-20 pb-10 max-w-6xl mx-auto" style={{ zIndex: 1 }}>
        {/*
          2-column grid on desktop:
            col 1 (flex-1)  — Name + role + bio + badges + CTA
            col 2 (400px)   — Sweetheart Box
        */}
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_400px] lg:items-center">

          {/* ── COL 1: Hero content ── */}
          <div className="order-1 flex flex-col gap-5">

            {/* Name beads */}
            <div className="overflow-visible">
              <FriendshipBeads />
            </div>

            {/* Role / title line */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <span className="font-mono font-black text-candy-pink text-base">AI / ML</span>
              <span className="font-mono text-white/20 text-base">·</span>
              <span className="font-mono font-black text-candy-mint text-base">Full Stack</span>
              <span className="font-mono text-white/20 text-base">·</span>
              <span className="font-mono font-black text-candy-lavender text-base">Engineer</span>
            </motion.div>

            {/* Bio — immediate, full-picture intro */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.4 }}
              className="font-mono text-white/70 text-base leading-relaxed max-w-lg"
            >
              First-year AI student at UCSD building multimodal AI systems, computer vision
              tools, and software that ships with intention. ACM mentor. TESC Co-President.
              Break Through Tech fellow. Hackathon winner.
            </motion.p>

            {/* UCSD badges */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.35 }}
              className="flex items-center gap-2 flex-wrap"
            >
              <div
                className="px-3 py-1 rounded-full font-mono font-bold text-charcoal text-xs border-2 border-black"
                style={{ background: "#C9B8E8", boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
              >
                UC San Diego 2029
              </div>
              <div
                className="px-3 py-1 rounded-full font-mono font-bold text-charcoal text-xs border-2 border-black"
                style={{ background: "#A8DDD5", boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
              >
                Artificial Intelligence
              </div>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.65, duration: 0.35 }}
              className="flex gap-3 flex-wrap"
            >
              <Link href="/projects">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 1, scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-candy-pink border-2 border-black font-mono font-black text-charcoal text-sm"
                  style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
                >
                  View My Work <span>→</span>
                </motion.div>
              </Link>
              <Link href="/contact">
                <motion.div
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 1, scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-white/20 font-mono font-bold text-white/60 text-sm"
                  style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.5)" }}
                >
                  Say Hi ♥
                </motion.div>
              </Link>
            </motion.div>
          </div>

          {/* ── COL 2: Sweetheart Box ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 180, damping: 20 }}
            className="order-2 flex justify-center lg:justify-end"
          >
            <SweetheartBox />
          </motion.div>

        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="relative h-px bg-gradient-to-r from-transparent via-candy-pink/40 to-transparent mx-6 mt-4" style={{ zIndex: 1 }} />

      {/* ── ABOUT ── */}
      <section className="relative pt-16 pb-16 px-6 max-w-6xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-1 w-8 bg-candy-pink rounded-full" />
          <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>About</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-candy-pink/40 to-transparent rounded-full" />
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[290px_1fr] lg:items-start">
          {/* NutritionLabel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="lg:sticky lg:top-24"
          >
            <NutritionLabel />
          </motion.div>

          {/* Personal text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <p className="font-mono text-white/70 text-sm leading-relaxed">
              I&apos;m drawn to the mathematical and conceptual sides of CS and AI, and where I really want to take
              that is <em className="text-candy-pink not-italic">Healthcare AI</em>, applying it to Cognitive Behavioral
              Neuroscience. I&apos;m passionate about taking what I&apos;ve learned and using it to build things that
              genuinely help people and give back to the communities around me.
            </p>
            <p className="font-mono text-white/70 text-sm leading-relaxed">
              Right now I&apos;m building AI reasoning pipelines, expanding into deep learning, and working on robotics
              autonomy with Triton Robotics. Outside of building, I mentor student developers through ACM and{" "}
              <a
                href="https://medium.com/cognitive-neuroeconomics/ive-got-99-problems-and-triton-mobile-is-all-of-them-2bb7586287de"
                target="_blank"
                rel="noopener noreferrer"
                className="text-candy-mint hover:text-candy-mint/80 underline underline-offset-2 transition-colors"
              >
                publish writing
              </a>{" "}
              on UX and product decisions that deserve more attention.
            </p>
            <p className="font-mono text-white/70 text-sm leading-relaxed">
              Always an iced tea nearby. Always a problem worth solving.
            </p>

            {/* Quick facts row */}
            <div className="flex flex-wrap gap-3 pt-2">
              {[
                { label: "Based in", value: "Bay Area, CA", color: "#F2A7BB" },
                { label: "Currently", value: "UC San Diego 2029", color: "#A8DDD5" },
                { label: "Seeking", value: "AI Research / ML — Summer 2026", color: "#C9B8E8" },
              ].map(({ label, value, color }) => (
                <div
                  key={label}
                  className="px-3 py-2 rounded-xl border-2 border-white/10 bg-white/[0.03]"
                  style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
                >
                  <div className="font-mono text-[10px] text-white/35 uppercase tracking-widest mb-0.5">{label}</div>
                  <div className="font-mono font-black text-xs" style={{ color }}>{value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      <section className="relative py-12 px-6 max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 24 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="h-1 w-8 bg-candy-orange rounded-full" />
              <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>
                Featured Work
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-candy-orange/40 to-transparent rounded-full" />
            </div>
            <Link href="/projects">
              <motion.span
                whileHover={{ x: 3 }}
                className="font-mono text-xs text-white/40 hover:text-candy-orange transition-colors"
              >
                all projects →
              </motion.span>
            </Link>
          </div>

          {/* Straightline card */}
          <motion.a
            href="https://devpost.com/software/straightline"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -3 }}
            className="flex flex-col sm:flex-row gap-5 p-5 rounded-2xl border-2 border-candy-pink-dark bg-candy-pink/5 group cursor-pointer"
            style={{ boxShadow: "5px 5px 0px 0px rgba(196,96,122,0.5)" }}
          >
            {/* Left: year + award badge */}
            <div className="flex flex-col gap-2 shrink-0 sm:w-36">
              <span className="font-mono text-xs text-white/30">2026</span>
              <div
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border-2 border-candy-lemon bg-candy-lemon/10 w-fit"
                style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
              >
                <span className="text-candy-lemon text-[9px] font-mono font-black">🏆 DIAMONDHACKS 2026</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {["Browser Use", "Python", "Next.js", "Supabase"].map(t => (
                  <span key={t} className="text-[9px] font-mono border border-candy-pink/40 text-candy-pink/70 px-1.5 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: title + description */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <h3
                  className="font-black text-xl text-candy-pink"
                  style={displayFont}
                >
                  Straightline
                </h3>
                <span className="font-mono text-white/20 text-xs group-hover:text-white/50 transition-colors">↗</span>
              </div>
              <p className="font-mono text-sm text-white/60 leading-relaxed">
                ADA compliance platform built in 36 hours. Uses autonomous Browser Use agents to
                scrape accessibility data for real-world locations, Gaussian Splatting for 3D
                environment reconstruction, and Supabase for caching. Won 1st place among
                400+ participants.
              </p>
            </div>
          </motion.a>
        </motion.div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section className="relative py-16 px-6 max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-4 mb-10"
        >
          <div className="h-1 w-8 bg-candy-pink rounded-full" />
          <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>Experience</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-candy-pink/40 to-transparent rounded-full" />
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
          {experience.map((exp, i) => (
            <ExperienceCard key={exp.role} {...exp} delay={i * 0.1} />
          ))}
        </div>
      </section>

      {/* ── AWARDS & PUBLICATIONS ── */}
      <section className="relative py-16 px-6 max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-1 w-8 bg-candy-lemon rounded-full" />
          <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>Awards &amp; Publications</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-candy-lemon/40 to-transparent rounded-full" />
        </motion.div>
        <div className="flex flex-col gap-3">
          {awards.map((award, i) => {
            const c = colorTokens[award.color];
            return (
              <motion.a
                key={award.title}
                href={award.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 250, damping: 22 }}
                whileHover={{ x: 4 }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 ${c.border} ${c.bg} glass-candy cursor-pointer group`}
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
              >
                <div className={`font-mono font-black text-xs px-2 py-1 rounded-full border-2 ${c.border} ${c.text} bg-black/30 shrink-0`}>
                  {award.date}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-mono font-black text-sm ${c.text} truncate`}>{award.title}</div>
                  <div className="font-mono text-xs text-white/40 mt-0.5">{award.event}</div>
                </div>
                <span className="font-mono text-xs text-white/30 group-hover:text-white/70 transition-colors shrink-0">↗</span>
              </motion.a>
            );
          })}
        </div>
      </section>

      {/* ── CLUBS & ACTIVITIES ── */}
      <section className="relative py-16 px-6 max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-1 w-8 bg-candy-mint rounded-full" />
          <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>Clubs &amp; Activities</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-candy-mint/40 to-transparent rounded-full" />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {activities.map((act, i) => {
            const c = colorTokens[act.color];
            return (
              <motion.div
                key={act.org}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 250, damping: 22 }}
                className={`p-4 rounded-xl border-2 ${c.border} ${c.bg} glass-candy hover:-translate-y-1 transition-transform duration-200`}
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
              >
                <div className={`font-black text-sm ${c.text} mb-1`} style={displayFont}>{act.org}</div>
                <div className="font-mono text-xs text-white/50 leading-relaxed">{act.role}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── READING LIST ── */}
      <section className="relative py-16 px-6 max-w-4xl mx-auto" style={{ zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-1 w-8 bg-candy-lavender rounded-full" />
          <h2 className="font-black text-2xl text-white tracking-tight" style={displayFont}>Interesting Finds</h2>
          <div className="h-1 flex-1 bg-gradient-to-r from-candy-lavender/40 to-transparent rounded-full" />
        </motion.div>
        <div className="flex flex-col gap-3">
          {reads.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 250, damping: 22 }}
              whileHover={{ x: 4 }}
              className="flex items-start gap-4 p-4 rounded-xl border-2 border-candy-lavender/40 bg-candy-lavender/5 glass-candy cursor-pointer group"
              style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
            >
              <span className="font-mono text-[10px] text-candy-lavender/60 font-black uppercase tracking-widest shrink-0 mt-0.5 w-14 text-right">{item.tag}</span>
              <div className="flex-1 min-w-0">
                <div className="font-mono font-black text-sm text-candy-lavender leading-snug">{item.title}</div>
                {item.note && <div className="font-mono text-xs text-white/35 mt-0.5 leading-relaxed">{item.note}</div>}
              </div>
              <span className="font-mono text-xs text-white/30 group-hover:text-white/70 transition-colors shrink-0 mt-0.5">↗</span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative border-t-2 border-white/10 py-8 px-6 text-center" style={{ zIndex: 1 }}>
        <p className="font-mono text-white/30 text-xs">
          Made with <span className="text-candy-pink">♥</span> and too much tea · Nicole Fong 2026
        </p>
      </footer>
    </div>
  );
}
