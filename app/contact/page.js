"use client";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import { Send, Mail, Code2, Briefcase, CheckCircle } from "lucide-react";

// Classes must be hardcoded strings — Tailwind JIT cannot resolve template literals at build time
const socials = [
  {
    label: "Email",
    value: "nicolefongjw@gmail.com",
    icon: Mail,
    href: "mailto:nicolefongjw@gmail.com",
    borderClass:   "border-candy-pink",
    textClass:     "text-candy-pink",
    iconBgClass:   "bg-candy-pink/20",
    iconBorderClass: "border-candy-pink",
  },
  {
    label: "GitHub",
    value: "github.com/tekkaonigiri",
    icon: Code2,
    href: "https://github.com/tekkaonigiri",
    borderClass:   "border-candy-mint",
    textClass:     "text-candy-mint",
    iconBgClass:   "bg-candy-mint/20",
    iconBorderClass: "border-candy-mint",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/coleng",
    icon: Briefcase,
    href: "https://linkedin.com/in/coleng",
    borderClass:   "border-candy-lavender",
    textClass:     "text-candy-lavender",
    iconBgClass:   "bg-candy-lavender/20",
    iconBorderClass: "border-candy-lavender",
  },
];

const inputClass = `
  w-full bg-white/5 border-2 border-white/20 rounded-xl px-4 py-3
  font-mono text-sm text-white placeholder-white/30
  focus:outline-none focus:border-candy-pink focus:bg-white/8
  transition-colors duration-200
`;

export default function ContactPage() {
  const [state, handleSubmit] = useForm("xojyqrny");

  return (
    <div className="min-h-screen bg-charcoal px-6 pt-28 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="px-3 py-1 rounded-full font-mono font-black text-charcoal text-xs border-2 border-black"
            style={{ background: "#C9B8E8", boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          >
            SAY HI
          </div>
        </div>
        <h1
          className="font-black text-4xl text-white tracking-tight"
          style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
        >
          Contact
        </h1>
        <p className="font-mono text-white/40 text-sm mt-1">
          Opportunities, collabs, or just a friendly wave.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 22 }}
        >
          {state.succeeded ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex flex-col items-center justify-center h-64 gap-4 rounded-2xl border-2 border-candy-mint bg-candy-mint/10"
              style={{ boxShadow: "4px 4px 0px 0px rgba(95,168,157,0.6)" }}
            >
              <CheckCircle size={40} className="text-candy-mint" />
              <div className="text-center">
                <div
                  className="font-black text-white text-lg"
                  style={{ fontFamily: "var(--font-display, 'Space Grotesk', sans-serif)" }}
                >
                  Message sent!
                </div>
                <div className="font-mono text-white/40 text-sm mt-1">I&apos;ll get back to you soon. ♥</div>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                  Your Name
                </label>
                <input
                  name="name"
                  required
                  placeholder="e.g. Bruno Mars"
                  className={inputClass}
                  style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.5)" }}
                />
                <ValidationError field="name" errors={state.errors} className="font-mono text-xs text-candy-pink mt-1 block" />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                  style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.5)" }}
                />
                <ValidationError field="email" errors={state.errors} className="font-mono text-xs text-candy-pink mt-1 block" />
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1.5">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="What's on your mind?"
                  className={`${inputClass} resize-none`}
                  style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.5)" }}
                />
                <ValidationError field="message" errors={state.errors} className="font-mono text-xs text-candy-pink mt-1 block" />
              </div>

              <motion.button
                type="submit"
                disabled={state.submitting}
                whileHover={{ y: -2 }}
                whileTap={{ y: 2, boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)" }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-candy-pink border-2 border-black font-mono font-black text-charcoal text-sm cursor-pointer disabled:opacity-60"
                style={{ boxShadow: "4px 4px 0px 0px rgba(0,0,0,1)" }}
              >
                {state.submitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-charcoal border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
          className="flex flex-col gap-4"
        >
          <p className="font-mono text-white/50 text-sm leading-relaxed mb-2">
            Open to internships and part-time work. Based in the Bay Area, open to remote.
          </p>

          {socials.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, type: "spring", stiffness: 250, damping: 20 }}
                whileHover={{ x: 4 }}
                className={`
                  flex items-center gap-4 p-4 rounded-xl border-2 glass-candy
                  ${s.borderClass} group
                `}
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,1)" }}
              >
                <div className={`w-10 h-10 rounded-full ${s.iconBgClass} border-2 ${s.iconBorderClass} flex items-center justify-center shrink-0`}>
                  <Icon size={16} className={s.textClass} />
                </div>
                <div>
                  <div className={`font-mono font-bold text-sm ${s.textClass}`}>{s.label}</div>
                  <div className="font-mono text-xs text-white/40">{s.value}</div>
                </div>
                <div className="ml-auto text-white/20 group-hover:text-white/60 transition-colors font-mono text-xs">↗</div>
              </motion.a>
            );
          })}

          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-full bg-candy-mint/10 border-2 border-candy-mint w-fit"
            style={{ boxShadow: "2px 2px 0px 0px rgba(0,0,0,1)" }}
          >
            <div className="w-2 h-2 rounded-full bg-candy-mint animate-pulse" />
            <span className="font-mono text-xs text-candy-mint font-bold">Available for opportunities</span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
