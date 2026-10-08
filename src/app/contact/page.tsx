import type { Metadata } from "next";
import { Clock, Lock, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function Contact() {
    return (
        <div className="min-h-screen py-20 px-8 flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Let&apos;s Build <br />
                            <span className="text-gradient">Something Great</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Tell us about your project and we&apos;ll get back to you with ideas, a timeline and a free estimate.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <a href={`mailto:${site.email}`}
                            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                            <Mail className="w-5 h-5 text-purple-400" /> {site.email}
                        </a>
                        {site.whatsapp && (
                            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-300 hover:bg-green-500/20 transition-colors">
                                <MessageCircle className="w-5 h-5" /> WhatsApp us
                            </a>
                        )}
                    </div>

                    <div className="space-y-4 pt-8 border-t border-white/10">
                        {[
                            { title: "Fast response", desc: "We reply to every inquiry within 24 hours.", icon: Clock },
                            { title: "NDA on request", desc: "Your idea stays confidential.", icon: Lock },
                            { title: "No obligation", desc: "Consultations and estimates are free.", icon: ShieldCheck },
                        ].map((f) => (
                            <div key={f.title} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <f.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{f.title}</h3>
                                    <p className="text-sm text-gray-400">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[60px] -z-10 pointer-events-none" />
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
