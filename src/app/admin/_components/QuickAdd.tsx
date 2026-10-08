"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Link2, Sparkles } from "lucide-react";

/** Paste a link on the dashboard and jump straight into the project form with it auto-filled. */
export default function QuickAdd() {
    const router = useRouter();
    const [url, setUrl] = useState("");

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const value = url.trim();
                if (value) router.push(`/admin/projects/new?url=${encodeURIComponent(/^https?:\/\//i.test(value) ? value : `https://${value}`)}`);
            }}
            className="relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-r from-violet-500/50 via-fuchsia-500/40 to-sky-500/40"
        >
            <div className="relative rounded-[15px] bg-[#0b0b14]/90 backdrop-blur-xl p-6 sm:p-7">
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-fuchsia-600/20 blur-3xl pointer-events-none" />
                <div className="relative flex items-center gap-2 text-sm font-semibold text-purple-300 mb-1">
                    <Sparkles className="w-4 h-4" /> Add a project in seconds
                </div>
                <p className="relative text-gray-400 text-sm mb-5">Paste a website link. We&apos;ll grab its title, description and thumbnail for you.</p>
                <div className="relative flex flex-col sm:flex-row gap-2">
                    <div className="relative flex-1">
                        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder="https://your-client-project.com"
                            className="w-full h-12 bg-black/50 border border-white/10 rounded-xl pl-10 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        />
                    </div>
                    <button
                        disabled={!url.trim()}
                        className="h-12 px-6 rounded-xl bg-white text-black font-semibold flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 transition-colors"
                    >
                        Continue <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </form>
    );
}
