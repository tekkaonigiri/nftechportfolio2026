"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Work",    href: "/projects" },
  { label: "Campus",  href: "/campus" },
  { label: "Resume",  href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-rule">
      <div className="max-w-page mx-auto px-5 lg:px-12 py-5 flex items-baseline justify-between gap-4">
        <Link
          href="/"
          className="font-display font-medium text-ink text-lg leading-none hover:text-accent transition-colors duration-150"
        >
          Nicole Fong
        </Link>
        <nav aria-label="Main" className="flex items-baseline gap-5 sm:gap-7">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "text-[15px] text-accent underline decoration-2 underline-offset-4"
                    : "text-[15px] text-ink-2 hover:text-accent transition-colors duration-150"
                }
              >
                {label}
              </Link>
            );
          })}
          <span className="self-center">
            <ThemeToggle />
          </span>
        </nav>
      </div>
    </header>
  );
}
