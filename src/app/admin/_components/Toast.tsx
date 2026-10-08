"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CheckCircle2, X } from "lucide-react";

const messages: Record<string, string> = {
    created: "Project added. Push to GitHub to publish it on your live site.",
    updated: "Changes saved. Push to GitHub to update your live site.",
    deleted: "Project deleted.",
    "inquiry-deleted": "Inquiry deleted.",
};

/** Shows a confirmation when a server action redirects with ?toast=<key>, then cleans the URL. */
export default function Toast() {
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const key = params.get("toast");
    const [message, setMessage] = useState<string | null>(null);
    const [seenKey, setSeenKey] = useState<string | null>(null);

    // Pick up a new ?toast= value during render (React's "adjust state on prop change" pattern).
    if (key !== seenKey) {
        setSeenKey(key);
        if (key && messages[key]) setMessage(messages[key]);
    }

    // Remove ?toast= from the URL so a refresh doesn't show it again.
    useEffect(() => {
        if (!key) return;
        const next = new URLSearchParams(params);
        next.delete("toast");
        router.replace(next.size ? `${pathname}?${next}` : pathname, { scroll: false });
    }, [key, params, pathname, router]);

    useEffect(() => {
        if (!message) return;
        const t = setTimeout(() => setMessage(null), 3500);
        return () => clearTimeout(t);
    }, [message]);

    if (!message) return null;
    return (
        <div role="status" className="fixed bottom-6 right-6 z-[60] animate-fade-in-up">
            <div className="flex items-center gap-3 pl-4 pr-2 py-3 rounded-2xl border border-emerald-500/20 bg-[#0d1512]/95 backdrop-blur-xl shadow-2xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-sm text-white">{message}</span>
                <button onClick={() => setMessage(null)} aria-label="Dismiss" className="p-1 rounded-lg text-gray-500 hover:text-white hover:bg-white/10">
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
