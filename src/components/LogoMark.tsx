import { clsx } from "clsx";
import { site } from "@/lib/site";

/**
 * Round logo with a gradient ring. Uses a small optimised copy of public/images/logo.jpg
 * (public/images/logo-mark.webp). Regenerate it if you replace the logo.
 */
export default function LogoMark({ className }: { className?: string }) {
    return (
        <span
            className={clsx(
                "relative block w-9 h-9 rounded-full p-[2px] bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500 shadow-[0_0_18px_-4px_rgba(192,38,211,0.7)] shrink-0",
                className
            )}
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-mark.webp" alt={`${site.name} logo`} width={192} height={192} className="w-full h-full rounded-full object-cover bg-[#0b0b14]" />
        </span>
    );
}
