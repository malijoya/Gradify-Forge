"use client";

import { useActionState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { submitInquiry, type ContactState } from "@/app/actions";
import { budgets, services } from "@/lib/site";
import Select from "./Select";

const serviceOptions = [...services.map((s) => s.title), "Something else"];

const input =
    "w-full bg-[#06060b] border border-white/[0.16] rounded-[10px] px-4 py-3 min-h-12 text-[15px] focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20 hover:border-white/30 transition-colors text-white placeholder:text-gray-500";

export default function ContactForm() {
    const [state, action, pending] = useActionState<ContactState, FormData>(submitInquiry, undefined);

    if (state?.ok) {
        return (
            <div className="text-center py-16 space-y-4 animate-fade-in-up">
                <CheckCircle className="w-14 h-14 text-green-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Thanks, we got your message!</h3>
                <p className="text-gray-400">We usually reply within 24 hours.</p>
            </div>
        );
    }

    return (
        <form action={action} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2 block">
                    <span className="text-[14px] font-medium text-gray-200">Your name *</span>
                    <input name="name" required maxLength={120} className={input} placeholder="Jane Doe" />
                </label>
                <label className="space-y-2 block">
                    <span className="text-[14px] font-medium text-gray-200">Email *</span>
                    <input name="email" type="email" required className={input} placeholder="jane@company.com" />
                </label>
            </div>
            <label className="space-y-2 block">
                <span className="text-[14px] font-medium text-gray-200">Company (optional)</span>
                <input name="company" className={input} placeholder="Acme Inc." />
            </label>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <span className="text-[14px] font-medium text-gray-200">What do you need?</span>
                    <Select name="service" placeholder="Select a service" options={serviceOptions} />
                </div>
                <div className="space-y-2">
                    <span className="text-[14px] font-medium text-gray-200">Budget</span>
                    <Select name="budget" placeholder="Select a range" options={budgets} />
                </div>
            </div>
            <label className="space-y-2 block">
                <span className="text-[14px] font-medium text-gray-200">Tell us about your project *</span>
                <textarea name="message" required rows={5} maxLength={5000} className={`${input} resize-none`}
                    placeholder="Goals, features, timeline, links to anything similar..." />
            </label>

            {/* Honeypot: hidden from humans */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

            <button
                disabled={pending}
                className="w-full h-12 rounded-full bg-white text-black text-[15px] font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 shadow-[0_0_30px_-8px_rgba(255,255,255,0.5)]"
            >
                {pending ? "Sending..." : <>Send message <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>}
            </button>
        </form>
    );
}
