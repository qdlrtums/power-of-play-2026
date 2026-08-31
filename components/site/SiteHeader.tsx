"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { nav, navCta } from "@/content/site";
import { Logo } from "./Logo";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface">
      <div className="mx-auto flex h-[5.5rem] max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:h-[7rem] lg:px-[clamp(2rem,7.5vw,7.5rem)]">
        <Link href="/" className="shrink-0 rounded-[var(--radius-sm)]">
          <Logo />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden items-center gap-8 md:flex lg:gap-11">
          {nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "font-display text-lg font-bold text-forest transition-colors lg:text-xl",
                  "hover:text-green-600",
                  active && "underline decoration-green-400 decoration-4 underline-offset-8",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={navCta.href}
            className="rounded-[var(--radius-md)] bg-green-400 px-6 py-3 font-display text-lg font-bold text-forest shadow-card transition-[transform,box-shadow] duration-200 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:shadow-lift lg:px-8 lg:py-3.5 lg:text-xl"
          >
            {navCta.label}
          </Link>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="rounded-[var(--radius-sm)] p-2 text-forest md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </div>

      {/* Mobile panel */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="border-t border-line bg-surface px-5 pb-6 pt-2 md:hidden"
      >
        <ul className="flex flex-col gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="block rounded-[var(--radius-sm)] py-3 font-display text-xl font-bold text-forest"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <Link
              href={navCta.href}
              onClick={() => setOpen(false)}
              className="block rounded-[var(--radius-md)] bg-green-400 px-6 py-3.5 text-center font-display text-xl font-bold text-forest"
            >
              {navCta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
