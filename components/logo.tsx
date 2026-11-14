import { cn } from "@/lib/utils";

/**
 * Flat wordmark + a small signal-ring mark (a call coming in), in brand's
 * signal-red. No gradients — matches the We Buy Houses Columbia / Brayden
 * Buys Homes logo lockup pattern (icon + Montserrat wordmark).
 */
export function Logo({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden className="shrink-0">
        <rect width="30" height="30" rx="8" fill={tone === "dark" ? "#ffffff" : "#1b2634"} />
        <path
          d="M10.2 9.4c.3-.8 1-1.3 1.8-1.2l1.6.2c.7.1 1.3.6 1.4 1.3l.3 1.9c.1.6-.1 1.2-.6 1.6l-1 .9c.6 1.5 1.7 2.6 3.2 3.2l.9-1c.4-.5 1-.7 1.6-.6l1.9.3c.7.1 1.2.7 1.3 1.4l.2 1.6c.1.8-.4 1.5-1.2 1.8-1 .3-2.1.4-3.3.1-3.6-.9-6.4-3.7-7.3-7.3-.3-1.2-.2-2.3.2-3.2z"
          fill={tone === "dark" ? "#1b2634" : "#ffffff"}
        />
        <circle cx="21.5" cy="9.5" r="1.6" fill="#b03823" />
      </svg>
      <span
        className={cn(
          "font-display text-[17px] font-extrabold tracking-[-0.01em]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        AllTheCalls<span style={{ color: "#b03823" }}>.ai</span>
      </span>
    </span>
  );
}

export default Logo;
