import Link from "next/link";
import { Logo } from "@/components/logo";
import { INDUSTRIES, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-brand-deep text-white/75">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr]">
        <div>
          <Logo tone="dark" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed">
            A done-for-you AI missed-call text-back, branded CRM app, and local SEO system for any
            local business that can&rsquo;t afford to miss a call.
          </p>
          <a href={SITE.phone.href} className="mt-4 inline-block text-[18px] font-semibold text-white hover:underline">
            {SITE.phone.display}
          </a>
          <a href={`mailto:${SITE.email}`} className="mt-1 block text-[15px] hover:text-white hover:underline">
            {SITE.email}
          </a>
        </div>

        <FooterList
          title="AllTheCalls"
          links={[
            { href: "/pricing", label: "Pricing" },
            { href: "/#how-it-works", label: "How it works" },
            { href: "/contact", label: "Contact" },
            { href: "/privacy", label: "Privacy" },
            { href: "/terms", label: "Terms" },
          ]}
        />
        <FooterList
          title="Industries"
          links={INDUSTRIES.map((i) => ({ href: `/industry/${i.slug}`, label: i.navLabel }))}
        />
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[13.5px] text-white/60 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl">
            AllTheCalls sells a done-for-you AI missed-call text-back, CRM, and SEO system to local
            businesses. Results depend on your market and how you use it.
          </p>
          <p className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <span>&copy; {new Date().getFullYear()} AllTheCalls</span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="text-[15px] font-bold text-white">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[15px] hover:text-white hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
