"use client";

import { Send, CheckCircle, CreditCard, Lock, Upload, ShieldCheck, Clock } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function Order() {
    const [submitted, setSubmitted] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        // Simulate form submission
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div className="min-h-screen py-20 px-8 flex items-center justify-center">
            <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-16">

                {/* Left Col: Headings & Trust Badges */}
                <div className="space-y-8">
                    <div>
                        <div className="inline-flex px-4 py-1.5 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-bold mb-4 items-center gap-1">
                            <ShieldCheck className="w-4 h-4" /> Secure SSL Encryption
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Start Your <br />
                            <span className="text-gradient">Dream Project</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Fill in the details below to get started. Our team will review your requirements and process your order securely.
                        </p>
                    </div>

                    <div className="space-y-6 pt-8 border-t border-white/10">
                        <h3 className="font-bold text-xl text-white">Why Choose Us?</h3>

                        {[
                            { title: "Confidentiality Guaranteed", desc: "Your project details and identity are never shared.", icon: Lock },
                            { title: "On-Time Delivery", desc: "We respect your academic deadlines.", icon: Clock },
                            { title: "Quality Assurance", desc: "Every project goes through rigorous testing.", icon: CheckCircle }
                        ].map((feature, i) => (
                            <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                                    <feature.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">{feature.title}</h4>
                                    <p className="text-sm text-gray-400">{feature.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Col: Form & Payment */}
                <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[60px] -z-10 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 blur-[60px] -z-10 pointer-events-none" />

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Project Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2">Project Requirements</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Project Type</label>
                                    <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-gray-300">
                                        <option>Final Year Project (FYP)</option>
                                        <option>Semester Project</option>
                                        <option>Thesis / Report</option>
                                        <option>Mobile App</option>
                                        <option>Web Application</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Deadline</label>
                                    <input type="date" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-white [color-scheme:dark]" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Detailed Requirements</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your project, technologies required, and specific features..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 placeholder:text-gray-600 resize-none"
                                ></textarea>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">University Guidelines (Optional)</label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 hover:border-purple-500/50 hover:bg-white/5 transition-all cursor-pointer">
                                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                                    <span className="text-xs">Drag & drop files or click to upload</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Section */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 flex justify-between items-center">
                                Secure Payment
                                <Lock className="w-4 h-4 text-green-400" />
                            </h3>

                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("card")}
                                    className={clsx(
                                        "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                        paymentMethod === "card"
                                            ? "bg-purple-600/20 border-purple-500 text-white"
                                            : "bg-black/40 border-white/10 text-gray-400 hover:bg-white/5"
                                    )}
                                >
                                    <CreditCard className="w-6 h-6" />
                                    <span className="text-sm font-bold">Credit/Debit Card</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("paypal")}
                                    className={clsx(
                                        "p-4 rounded-xl border flex flex-col items-center gap-2 transition-all",
                                        paymentMethod === "paypal"
                                            ? "bg-blue-600/20 border-blue-500 text-white"
                                            : "bg-black/40 border-white/10 text-gray-400 hover:bg-white/5"
                                    )}
                                >
                                    <div className="font-bold text-xl italic font-serif">Pay<span className="text-blue-400">Pal</span></div>
                                    <span className="text-sm font-bold">PayPal</span>
                                </button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4 animate-fade-in-up">
                                    <input type="text" placeholder="Card Number" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                                        <input type="text" placeholder="CVC" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={submitted}
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 py-4 rounded-xl font-bold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50 text-lg shadow-lg shadow-purple-900/20"
                        >
                            {submitted ? "Processing..." : <>Confirm & Pay <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
                        </button>
                        <p className="text-xs text-center text-gray-500">
                            By processing payment, you agree to our <span className="text-purple-400 cursor-pointer">Terms of Service</span>.
                        </p>
                    </form>
                </div>

            </div>
        </div>
    );
}
