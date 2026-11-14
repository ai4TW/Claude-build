"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { SITE } from "@/lib/site";

const LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#industries", label: "Industries" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-5 lg:h-[76px] xl:gap-6">
        <Link href="/" aria-label="AllTheCalls, home page" className="shrink-0 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-[15px] font-medium whitespace-nowrap text-ink-soft xl:gap-7">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="rounded-sm hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={SITE.phone.href}
            className="hidden items-center gap-2 rounded-sm text-[15px] font-semibold whitespace-nowrap text-ink hover:text-brand sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone size={16} aria-hidden />
            {SITE.phone.display}
          </a>
          <Link href="/pricing" className="btn-primary hidden h-11 px-5 text-[15px] md:inline-flex">
            See pricing
          </Link>
        </div>
      </div>
    </header>
  );
}

export default SiteNav;

/** Phone-width only: calling and pricing stay one thumb away. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-sm md:hidden">
      <div className="flex gap-3">
        <a href={SITE.phone.href} className="btn-secondary h-12 flex-1 text-[16px]">
          <Phone size={17} aria-hidden />
          Call
        </a>
        <Link href="/pricing" className="btn-primary h-12 flex-[2] text-[16px]">
          See pricing
        </Link>
      </div>
    </div>
  );
}
