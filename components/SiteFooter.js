const footerLinks = [
  { label: "Email",    href: "mailto:nicolefongjw@gmail.com" },
  { label: "GitHub",   href: "https://github.com/nclfng" },
  { label: "LinkedIn", href: "https://linkedin.com/in/coleng" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-rule">
      <div className="max-w-page mx-auto px-5 lg:px-12 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-mono text-xs text-ink-3">
          Made with <span className="text-accent">♥</span> and too much tea · Nicole Fong 2026
        </p>
        <nav aria-label="Social" className="flex gap-6">
          {footerLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              className="text-sm text-ink-2 hover:text-accent transition-colors duration-150"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
