import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, MapPin, Twitter } from "lucide-react";
import { site } from "@/lib/site";
import LogoMark from "./LogoMark";

const socialIcons = { github: Github, linkedin: Linkedin, x: Twitter, instagram: Instagram };

const columns = [
    {
        title: "explore",
        links: [
            { name: "Home", href: "/" },
            { name: "Services", href: "/services" },
            { name: "Portfolio", href: "/portfolio" },
        ],
    },
    {
        title: "start",
        links: [
            { name: "Contact", href: "/contact" },
            { name: "Free consultation", href: "/contact" },
        ],
    },
];

export default function Footer() {
    const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialIcons, string][];

    return (
        <footer className="border-t border-white/[0.07] bg-[#06060c]/80">
            <div className="mx-auto max-w-[1188px] px-6">
                <div className="flex flex-wrap items-center justify-between gap-3 py-5 border-b border-white/[0.06] font-mono text-[12px] text-gray-500">
                    <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                        open for new projects
                    </span>
                    <span>replies within 24 hours</span>
                    <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" /> {site.location}
                    </span>
                </div>

                <div className="grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))]">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5">
                            <LogoMark className="w-8 h-8" />
                            <span className="font-medium tracking-tight text-white text-[17px]">{site.name}</span>
                        </div>
                        <p className="max-w-xs text-[14px] leading-relaxed text-gray-400">{site.tagline}</p>
                    </div>

                    {columns.map((c) => (
                        <div key={c.title} className="space-y-3 text-[14px]">
                            <div className="font-mono text-[12px] text-gray-600">{c.title}</div>
                            {c.links.map((l) => (
                                <Link key={l.name} href={l.href} className="block text-gray-400 hover:text-white transition-colors">
                                    {l.name}
                                </Link>
                            ))}
                        </div>
                    ))}

                    <div className="space-y-3 text-[14px]">
                        <div className="font-mono text-[12px] text-gray-600">get in touch</div>
                        <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors break-all">
                            <Mail className="w-4 h-4 shrink-0" /> {site.email}
                        </a>
                        {socials.length > 0 && (
                            <div className="flex gap-2 pt-1">
                                {socials.map(([key, url]) => {
                                    const Icon = socialIcons[key];
                                    return (
                                        <a
                                            key={key}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={key}
                                            className="grid place-items-center w-9 h-9 rounded-[10px] border border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.08] transition-colors"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-wrap justify-between gap-2 py-6 border-t border-white/[0.06] font-mono text-[11px] text-gray-600">
                    <span>
                        © {new Date().getFullYear()} {site.name}. All rights reserved.
                    </span>
                    <span>software studio · web · mobile · ai · iot</span>
                </div>
            </div>
        </footer>
    );
}
