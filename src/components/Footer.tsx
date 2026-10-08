import Link from "next/link";
import { Github, Linkedin, Instagram, Mail, MapPin, Twitter } from "lucide-react";
import { site } from "@/lib/site";
import LogoMark from "./LogoMark";

const socialIcons = { github: Github, linkedin: Linkedin, x: Twitter, instagram: Instagram };

export default function Footer() {
    const socials = Object.entries(site.socials).filter(([, url]) => url) as [keyof typeof socialIcons, string][];

    return (
        <footer className="border-t border-white/10 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-8 py-12 grid gap-8 md:grid-cols-3">
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <LogoMark className="w-11 h-11" />
                        <span className="text-xl font-semibold tracking-tight text-white">{site.name}</span>
                    </div>
                    <p className="text-sm text-gray-400 max-w-xs">{site.tagline}</p>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="font-bold text-white mb-3">Explore</div>
                    <Link href="/services" className="block text-gray-400 hover:text-white">Services</Link>
                    <Link href="/portfolio" className="block text-gray-400 hover:text-white">Portfolio</Link>
                    <Link href="/contact" className="block text-gray-400 hover:text-white">Contact</Link>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="font-bold text-white mb-3">Get in touch</div>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-2 text-gray-400 hover:text-white">
                        <Mail className="w-4 h-4" /> {site.email}
                    </a>
                    <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="w-4 h-4" /> {site.location}
                    </div>
                    {socials.length > 0 && (
                        <div className="flex gap-3 pt-2">
                            {socials.map(([key, url]) => {
                                const Icon = socialIcons[key];
                                return (
                                    <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}
                                        className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors">
                                        <Icon className="w-4 h-4" />
                                    </a>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
            <div className="border-t border-white/5 py-6 text-center text-xs text-gray-600">
                © {new Date().getFullYear()} {site.name}. All rights reserved.
            </div>
        </footer>
    );
}
