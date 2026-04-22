"use client";
import { motion } from "framer-motion";
import { Download, FileText, Lock } from "lucide-react";

const RESUME_PATH    = "/resume.pdf";
const DRIVE_PREVIEW  = RESUME_PATH;
const DRIVE_DOWNLOAD = RESUME_PATH;

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-charcoal px-6 pt-28 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Lock size={12} className="text-candy-lemon" />
            <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">The Vault</span>
          </div>
          <h1 className="font-mono font-black text-4xl text-white tracking-tight">Resume</h1>
          <p className="font-mono text-white/40 text-sm mt-1">A golden ticket to my professional story.</p>
        </div>

        {/* Golden Ticket Download Button */}
        <motion.a
          href={DRIVE_DOWNLOAD}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 20 }}
          whileHover={{ y: -3, rotate: -1 }}
          whileTap={{ scale: 0.93, y: 2 }}
          className="group relative inline-flex items-center gap-3 px-6 py-4 rounded-xl border-2 border-black font-mono font-black text-charcoal cursor-pointer shrink-0"
          style={{
            background: "linear-gradient(135deg, #F5E6A3 0%, #e8c84a 50%, #F5E6A3 100%)",
            backgroundSize: "200% 100%",
            boxShadow: "5px 5px 0px 0px rgba(0,0,0,1)",
          }}
        >
          {/* Ticket edge notches */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-charcoal border-2 border-black" />
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-charcoal border-2 border-black" />
          {/* Dashed middle line */}
          <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-black/20 pointer-events-none" />

          <Download size={16} className="relative z-10" />
          <div className="relative z-10">
            <div className="text-sm leading-none">Download PDF</div>
            <div className="text-[9px] font-normal opacity-60 mt-0.5">Golden Ticket Edition</div>
          </div>
          <FileText size={16} className="relative z-10 opacity-50" />
        </motion.a>
      </motion.div>

      {/* PDF Viewer — embedded from Google Drive */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 22 }}
        className="relative rounded-2xl border-2 border-white/20 overflow-hidden"
        style={{ boxShadow: "6px 6px 0px 0px rgba(0,0,0,1), inset 0 1px 0 rgba(255,255,255,0.1)" }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b-2 border-white/10">
          <div className="w-3 h-3 rounded-full bg-candy-pink border border-black" />
          <div className="w-3 h-3 rounded-full bg-candy-lemon border border-black" />
          <div className="w-3 h-3 rounded-full bg-candy-mint border border-black" />
          <span className="font-mono text-white/30 text-xs ml-3">nicole-fong-resume.pdf</span>
        </div>

        {/* Google Drive PDF embed */}
        <div className="bg-white/5" style={{ minHeight: "70vh" }}>
          <iframe
            src={DRIVE_PREVIEW}
            className="w-full"
            style={{ minHeight: "70vh", border: "none" }}
            title="Nicole Fong Resume"
            allow="autoplay"
          />
        </div>
      </motion.div>
    </div>
  );
}
