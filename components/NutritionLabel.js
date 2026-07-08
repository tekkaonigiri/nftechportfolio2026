const skills = [
  { name: "TypeScript / JS", pct: 95 },
  { name: "React / Next.js", pct: 92 },
  { name: "Python",          pct: 85 },
  { name: "Claude API",      pct: 80 },
];

const fieldNotes = [
  { label: "Curiosity Drive", value: "∞" },
  { label: "Tea Dependency",  value: "High" },
  { label: "Side Projects",   value: "Always" },
  { label: "Docs Enthusiast", value: "✓ True" },
];

export default function NutritionLabel() {
  return (
    <div className="bg-raised border border-rule rounded p-6">
      {/* Header */}
      <h3 className="font-display font-semibold text-ink text-xl leading-tight">
        At a glance
      </h3>
      <p className="font-mono text-xs text-ink-3 tracking-[0.12em] uppercase mt-1">
        Nicole Fong — Developer Profile
      </p>

      {/* Serving info */}
      <div className="mt-5 border-t border-rule">
        <div className="flex justify-between py-2 border-b border-rule text-sm">
          <span className="text-ink-3">Serving Size</span>
          <span className="text-ink font-semibold">1 Engineer</span>
        </div>
        <div className="flex justify-between py-2 border-b border-rule text-sm">
          <span className="text-ink-3">Years Building</span>
          <span className="text-ink font-semibold">3+</span>
        </div>
      </div>

      {/* Core skills */}
      <div className="mt-5">
        <p className="font-mono text-xs text-ink-3 tracking-[0.12em] uppercase mb-3">
          Core skills
        </p>
        {skills.map(({ name, pct }) => (
          <div key={name} className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-ink-2">{name}</span>
              <span className="font-mono text-xs text-ink-3">{pct}%</span>
            </div>
            <div className="h-[3px] bg-rule rounded-sm overflow-hidden">
              <div
                className="h-full bg-accent rounded-sm"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Field notes */}
      <div className="mt-5">
        <p className="font-mono text-xs text-ink-3 tracking-[0.12em] uppercase mb-1">
          Field notes
        </p>
        {fieldNotes.map(({ label, value }) => (
          <div
            key={label}
            className="flex justify-between items-baseline py-2 border-b border-rule text-sm"
          >
            <span className="text-ink-3">{label}</span>
            <span className="text-ink font-semibold">{value}</span>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <p className="mt-4 text-xs text-ink-3 leading-relaxed">
        * Self-reported. Fueled by iced tea and deadline pressure.
      </p>
    </div>
  );
}
