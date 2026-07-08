import { Mail, Code2, Briefcase } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const socials = [
  {
    label: "Email",
    value: "nicolefongjw@gmail.com",
    icon: Mail,
    href: "mailto:nicolefongjw@gmail.com",
  },
  {
    label: "GitHub",
    value: "github.com/tekkaonigiri",
    icon: Code2,
    href: "https://github.com/tekkaonigiri",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/coleng",
    icon: Briefcase,
    href: "https://linkedin.com/in/coleng",
  },
];

export default function ContactPage() {
  return (
    <div className="fade-in max-w-page mx-auto px-5 lg:px-12 pt-14 lg:pt-20 pb-14 lg:pb-[88px]">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display font-medium text-ink text-[32px] lg:text-[40px] leading-tight">
          Contact
        </h1>
        <div className="w-16 border-b-2 border-accent mt-4" />
        <p className="text-sm text-ink-3 mt-4">
          Opportunities, collabs, or just a friendly wave.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
        <ContactForm />

        {/* Connections */}
        <div className="flex flex-col">
          <p className="text-[15px] text-ink-2 leading-relaxed mb-6 max-w-prose">
            Open to internships and part-time work. Based in the Bay Area, open to remote.
          </p>

          <div className="border-y border-rule divide-y divide-rule">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-4 py-4"
                >
                  <Icon size={16} className="text-ink-3 shrink-0" />
                  <span className="flex-1 min-w-0">
                    <span className="block text-sm font-semibold text-ink group-hover:text-accent transition-colors duration-150">
                      {s.label}
                    </span>
                    <span className="block font-mono text-[13px] text-ink-3 mt-0.5">
                      {s.value}
                    </span>
                  </span>
                  <span className="font-mono text-xs text-ink-3">↗</span>
                </a>
              );
            })}
          </div>

          {/* Availability */}
          <p className="mt-6 flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-mono text-[13px] text-ink-2">
              Available for opportunities
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
