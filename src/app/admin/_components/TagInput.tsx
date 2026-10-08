"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

const SUGGESTIONS = ["Next.js", "React", "Node.js", "Tailwind CSS", "TypeScript", "Flutter", "Firebase", "Python", "Stripe", "MongoDB"];
const MAX_TAGS = 12;

type Props = {
    name: string;
    tags: string[];
    onChange: (tags: string[]) => void;
};

/** Chip-style tag editor. Enter or comma adds a tag, Backspace on an empty field removes the last one. */
export default function TagInput({ name, tags, onChange }: Props) {
    const [draft, setDraft] = useState("");

    function add(raw: string) {
        const next = [...tags];
        for (const t of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
            if (next.length >= MAX_TAGS) break;
            if (!next.some((x) => x.toLowerCase() === t.toLowerCase())) next.push(t.slice(0, 30));
        }
        onChange(next);
        setDraft("");
    }

    const remove = (t: string) => onChange(tags.filter((x) => x !== t));
    const suggestions = SUGGESTIONS.filter((s) => !tags.some((t) => t.toLowerCase() === s.toLowerCase())).slice(0, 6);

    return (
        <div className="space-y-2.5">
            <input type="hidden" name={name} value={tags.join(", ")} />
            <div className="flex flex-wrap items-center gap-2 min-h-12 bg-black/40 border border-white/10 rounded-xl px-3 py-2 focus-within:border-purple-500 transition-colors">
                {tags.map((t) => (
                    <span key={t} className="flex items-center gap-1 pl-2.5 pr-1 h-7 rounded-lg bg-purple-500/15 ring-1 ring-inset ring-purple-400/25 text-purple-100 text-sm">
                        {t}
                        <button type="button" onClick={() => remove(t)} aria-label={`Remove ${t}`} className="p-0.5 rounded hover:bg-white/15 text-purple-300">
                            <X className="w-3.5 h-3.5" />
                        </button>
                    </span>
                ))}
                {tags.length < MAX_TAGS && (
                    <input
                        value={draft}
                        onChange={(e) => (e.target.value.includes(",") ? add(e.target.value) : setDraft(e.target.value))}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                add(draft);
                            } else if (e.key === "Backspace" && !draft && tags.length) {
                                remove(tags[tags.length - 1]);
                            }
                        }}
                        onBlur={() => draft && add(draft)}
                        placeholder={tags.length ? "Add more..." : "Type a technology and press Enter"}
                        className="flex-1 min-w-[160px] bg-transparent py-1 text-white placeholder:text-gray-600 focus:outline-none"
                    />
                )}
            </div>
            {suggestions.length > 0 && tags.length < MAX_TAGS && (
                <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-gray-500 mr-1">Quick add:</span>
                    {suggestions.map((s) => (
                        <button
                            key={s}
                            type="button"
                            onClick={() => add(s)}
                            className="flex items-center gap-1 px-2 h-6 rounded-md border border-white/10 text-xs text-gray-400 hover:text-white hover:border-white/25 transition-colors"
                        >
                            <Plus className="w-3 h-3" /> {s}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
