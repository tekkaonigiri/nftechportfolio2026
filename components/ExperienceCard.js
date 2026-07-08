export default function ExperienceCard({ role, company, period, bullets }) {
  return (
    <div className="bg-raised border border-rule rounded p-6">
      <h3 className="font-display font-semibold text-ink text-xl leading-tight">
        {role}
      </h3>
      <p className="font-mono text-[13px] text-ink-3 mt-1.5">
        {company} · {period}
      </p>
      <ul className="mt-4 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm text-ink-2 leading-relaxed">
            <span className="text-ink-3 shrink-0">–</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
