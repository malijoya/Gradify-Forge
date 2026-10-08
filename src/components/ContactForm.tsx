"use client";

import { useActionState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { submitInquiry, type ContactState } from "@/app/actions";
import { budgets, services } from "@/lib/site";
import Select from "./Select";

const serviceOptions = [...services.map((s) => s.title), "Something else"];

const input =
    "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-white placeholder:text-gray-600";

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
                    <span className="text-sm font-medium text-gray-300">Your name *</span>
                    <input name="name" required maxLength={120} className={input} placeholder="Jane Doe" />
                </label>
                <label className="space-y-2 block">
                    <span className="text-sm font-medium text-gray-300">Email *</span>
                    <input name="email" type="email" required className={input} placeholder="jane@company.com" />
                </label>
            </div>
            <label className="space-y-2 block">
                <span className="text-sm font-medium text-gray-300">Company (optional)</span>
                <input name="company" className={input} placeholder="Acme Inc." />
            </label>
            <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-300">What do you need?</span>
                    <Select name="service" placeholder="Select a service" options={serviceOptions} />
                </div>
                <div className="space-y-2">
                    <span className="text-sm font-medium text-gray-300">Budget</span>
                    <Select name="budget" placeholder="Select a range" options={budgets} />
                </div>
            </div>
            <label className="space-y-2 block">
                <span className="text-sm font-medium text-gray-300">Tell us about your project *</span>
                <textarea name="message" required rows={5} maxLength={5000} className={`${input} resize-none`}
                    placeholder="Goals, features, timeline, links to anything similar..." />
            </label>

            {/* Honeypot: hidden from humans */}
            <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

            {state?.error && <p className="text-sm text-red-400">{state.error}</p>}

            <button
                disabled={pending}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50 text-lg shadow-lg shadow-purple-900/20"
            >
                {pending ? "Sending..." : <>Send Message <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
        </form>
    );
}
