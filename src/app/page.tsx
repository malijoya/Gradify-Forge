"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Quote, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-8 overflow-hidden min-h-[90vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black z-0 pointer-events-none" />
        <div className="absolute top-0 w-full h-full bg-[url('/grid.svg')] opacity-20 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium mb-4 animate-fade-in-up">
            Graduation Made Simple
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            We Build Your <br />
            <span className="text-gradient">Final Year Project</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Don&apos;t let FYP stress hold you back. We provide complete, professional projects with documentation, code explanation, and viva support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/order"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 transform hover:scale-105"
            >
              Get Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium text-lg"
            >
              View Examples
            </Link>
          </div>

          <div className="pt-12 flex justify-center gap-8 text-gray-500 text-sm">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 100% Viva Success Rate</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Plagiarism Free</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 24/7 Support</div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-8 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Transparent Pricing</h2>
            <p className="text-gray-400">Choose the package that fits your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Tier */}
            <div className="glass-card p-8 hover:border-purple-500/50 transition-colors flex flex-col">
              <h3 className="text-xl font-bold text-gray-300 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-white mb-6">$300</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Complete Source Code</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Setup Guide</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> 1 Revision</li>
              </ul>
              <Link href="/order" className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 text-center font-bold transition-colors">Select Basic</Link>
            </div>

            {/* Standard Tier */}
            <div className="glass-card p-8 border-purple-500/50 bg-purple-500/5 relative flex flex-col transform md:-translate-y-4">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">Most Popular</div>
              <h3 className="text-xl font-bold text-white mb-2">Standard</h3>
              <div className="text-4xl font-bold text-white mb-6">$500</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-white"><CheckCircle className="w-5 h-5 text-green-400" /> Complete Source Code</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle className="w-5 h-5 text-green-400" /> Project Documentation</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle className="w-5 h-5 text-green-400" /> Database Design</li>
                <li className="flex items-center gap-3 text-white"><CheckCircle className="w-5 h-5 text-green-400" /> 3 Revisions</li>
              </ul>
              <Link href="/order" className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-center font-bold transition-colors">Select Standard</Link>
            </div>

            {/* Premium Tier */}
            <div className="glass-card p-8 hover:border-purple-500/50 transition-colors flex flex-col">
              <h3 className="text-xl font-bold text-gray-300 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-white mb-6">$800</div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Everything in Standard</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Viva Presentation Prep</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Code Explanation Session</li>
                <li className="flex items-center gap-3 text-gray-400"><CheckCircle className="w-5 h-5 text-purple-500" /> Unlimited Revisions</li>
              </ul>
              <Link href="/order" className="w-full py-3 rounded-xl border border-white/20 hover:bg-white/10 text-center font-bold transition-colors">Select Premium</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Student Stories</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                text: "GradifyForge saved my FYP! The code was clean, and the documentation helped me answer every question during the viva.",
                name: "Sarah A.",
                uni: "CS Student"
              },
              {
                text: "I was struggling with the backend connection, but their team handled it perfectly. Highly recommended for any final year student.",
                name: "Michael R.",
                uni: "Software Engineering"
              },
              {
                text: "Professional, fast, and exactly what I needed. The code explanation session was a game changer for my presentation.",
                name: "David K.",
                uni: "IT Graduate"
              }
            ].map((t, i) => (
              <div key={i} className="glass-card p-8 relative">
                <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20" />
                <div className="flex gap-1 text-yellow-500 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-sm text-purple-400">{t.uni}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-purple-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-card p-12 border-purple-500/30">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Ace Your FYP?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Slots are filling up fast for this semester. Secure your project today.
          </p>
          <Link
            href="/order"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl hover:opacity-90 transition-opacity"
          >
            Get a Free Consultation <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
