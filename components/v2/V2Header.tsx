"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { v2Nav, v2NavCta } from "@/content/v2";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

/**
 * A floating bar. It condenses on scroll. The scroll listener is passive and
 * only ever flips a boolean, so it never reads layout.
 */
export function V2Header() {
  const pathname = usePathname();
  const [condensed, setCondensed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <div
        className={cn(
          "mx-auto flex max-w-[84rem] items-center justify-between rounded-[var(--radius-block)]",
          "border border-hairline bg-white",
          "transition-[padding,box-shadow] duration-300 ease-[var(--ease-brand)]",
          condensed ? "px-4 py-2.5 shadow-float sm:px-5" : "px-4 py-4 sm:px-6",
        )}
      >
        <Link href="/" className="flex shrink-0 items-center rounded-[var(--radius-edge)]">
          <Image
            src="/brand/pop-logo.png"
            alt={`${site.name} home`}
            width={234}
            height={154}
            priority
            className={cn(
              "w-auto transition-[height] duration-300 ease-[var(--ease-brand)]",
              condensed ? "h-9" : "h-11",
            )}
          />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {v2Nav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "v2-label rounded-[var(--radius-pill)] px-4 py-2.5 transition-colors duration-200",
                  active
                    ? "bg-paper-3 text-ink-warm"
                    : "text-ink-warm-2 hover:bg-paper-2 hover:text-ink-warm",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={v2NavCta.href}
            className="v2-label ml-2 rounded-[var(--radius-pill)] bg-obsidian px-5 py-3 text-paper transition-colors duration-200 hover:bg-green-400 hover:text-obsidian"
          >
            {v2NavCta.label}
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="v2-label cursor-pointer rounded-[var(--radius-pill)] border border-hairline px-4 py-2.5 text-ink-warm transition-colors duration-200 hover:bg-paper-2 md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!open}
        className="mx-auto mt-2 max-w-[84rem] rounded-[var(--radius-block)] border border-hairline bg-white p-3 shadow-float md:hidden"
      >
        <ul>
          {v2Nav.map((item) => (
            <li key={item.href} className="border-b border-hairline-soft last:border-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="block px-2 py-4 font-display text-2xl font-bold text-ink-warm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href={v2NavCta.href}
          onClick={() => setOpen(false)}
          className="v2-label mt-3 block rounded-[var(--radius-pill)] bg-obsidian px-5 py-4 text-center text-paper"
        >
          {v2NavCta.label}
        </Link>
      </nav>
    </header>
  );
}
