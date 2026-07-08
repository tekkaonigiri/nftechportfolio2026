import { Download } from "lucide-react";

const RESUME_PATH = "/resume.pdf";

export default function ResumePage() {
  return (
    <div className="fade-in max-w-page mx-auto px-5 lg:px-12 pt-14 lg:pt-20 pb-14 lg:pb-[88px]">
      {/* Header */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="font-display font-medium text-ink text-[32px] lg:text-[40px] leading-tight">
            Resume
          </h1>
          <div className="w-16 border-b-2 border-accent mt-4" />
          <p className="text-sm text-ink-3 mt-4">The one-page version, kept current.</p>
        </div>

        <a
          href={RESUME_PATH}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-ink text-bg text-sm font-semibold hover:bg-accent transition-colors duration-150 shrink-0"
        >
          <Download size={15} />
          Download PDF
        </a>
      </div>

      {/* PDF viewer */}
      <div className="border border-rule rounded overflow-hidden">
        <div className="px-4 py-3 bg-raised border-b border-rule">
          <span className="font-mono text-xs text-ink-3">nicole-fong-resume.pdf</span>
        </div>
        <div style={{ minHeight: "70vh" }}>
          <iframe
            src={RESUME_PATH}
            className="w-full"
            style={{ minHeight: "70vh", border: "none" }}
            title="Nicole Fong Resume"
          />
        </div>
      </div>
    </div>
  );
}
