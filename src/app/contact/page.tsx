import type { Metadata } from "next";
import { Clock, Lock, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import PageStrands from "@/components/home/PageStrands";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

const promises = [
    { title: "Fast response", desc: "We reply to every inquiry within 24 hours.", icon: Clock },
    { title: "NDA on request", desc: "Your idea stays confidential.", icon: Lock },
    { title: "No obligation", desc: "Consultations and estimates are free.", icon: ShieldCheck },
];

const next = [
    { when: "within 24 h", what: "We reply with questions and first ideas." },
    { when: "free call", what: "We go through goals, users and constraints together." },
    { when: "estimate", what: "You get a scope, timeline and price to decide on." },
];

export default function Contact() {
    return (
        <div className="flex flex-col min-h-screen">
            <PageHero
                compact
                kicker="contact / replies within 24 hours"
                title={
                    <>
                        Let&apos;s build something <em>great.</em>
                    </>
                }
                lead="Tell us about your project and we'll get back to you with ideas, a timeline and a free estimate."
                aside={
                    <div className="flex flex-col gap-2.5 lg:items-end">
                        <a
                            href={`mailto:${site.email}`}
                            className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-white/15 bg-white/[0.04] font-mono text-[13px] text-gray-200 hover:bg-white/[0.09] transition-colors"
                        >
                            <Mail className="w-4 h-4 text-violet-300" /> {site.email}
                        </a>
                        {site.whatsapp && (
                            <a
                                href={`https://wa.me/${site.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-11 px-4 rounded-full border border-green-500/25 bg-green-500/10 font-mono text-[13px] text-green-300 hover:bg-green-500/20 transition-colors"
                            >
                                <MessageCircle className="w-4 h-4" /> whatsapp us
                            </a>
                        )}
                    </div>
                }
            />

            <div className="relative isolate">
                <PageStrands />
                <section aria-label="Send us a message" className="mx-auto w-full max-w-[1188px] px-6 pt-2 pb-28">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)] lg:gap-14 items-start">
                        <div className="space-y-10">
                            <ul className="home-stagger space-y-3">
                                {promises.map((p) => (
                                    <li key={p.title} className="home-card rounded-[16px] p-5 flex gap-4">
                                        <span className="grid place-items-center w-10 h-10 shrink-0 rounded-[10px] border border-white/10 bg-white/[0.03] text-violet-300">
                                            <p.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                                        </span>
                                        <div>
                                            <h2 className="text-[15px] font-medium text-white">{p.title}</h2>
                                            <p className="mt-1 text-[13px] text-gray-400">{p.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <div>
                                <p className="font-mono text-[12px] text-gray-500">what happens next</p>
                                <ol className="home-stagger mt-5 relative border-l border-dashed border-white/15 ml-1.5 space-y-6">
                                    {next.map((n, i) => (
                                        <li key={n.when} className="pl-6 relative">
                                            <span
                                                aria-hidden
                                                className={
                                                    i === 0
                                                        ? "absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-violet-300 shadow-[0_0_10px_rgba(196,181,253,0.9)]"
                                                        : "absolute -left-[4px] top-1.5 w-2 h-2 rounded-full bg-white/25"
                                                }
                                            />
                                            <span className="font-mono text-[12px] text-violet-300">{n.when}</span>
                                            <p className="mt-1 text-[14px] text-gray-300">{n.what}</p>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>

                        <div className="home-reveal relative order-first lg:order-none rounded-[22px] border border-violet-300/20 bg-[#0c0c14] p-6 sm:p-9 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_30px_80px_-30px_rgba(139,92,246,0.45)]">
                            <span aria-hidden className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />
                            <div className="mb-2 flex items-center justify-between font-mono text-[12px] text-gray-500">
                                <span>new inquiry</span>
                                <span className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.9)]" />
                                    open for new projects
                                </span>
                            </div>
                            <h2 className="text-[22px] font-medium tracking-tight text-white">Send us a message</h2>
                            <p className="mt-1 mb-7 text-[14px] text-gray-400">Takes about two minutes. Fields marked * are required.</p>
                            <ContactForm />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
