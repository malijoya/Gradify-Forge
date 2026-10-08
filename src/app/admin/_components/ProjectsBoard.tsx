"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Eye, EyeOff, ImageOff, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import type { Project } from "@/lib/db";
import { hostname, timeAgo } from "@/lib/format";
import { removeProject, toggleProject } from "../actions";
import ConfirmButton from "../(panel)/ConfirmButton";
import ActionButton from "./ActionButton";

const filters = [
    { id: "all", label: "All", test: () => true },
    { id: "live", label: "Live", test: (p: Project) => p.published },
    { id: "hidden", label: "Hidden", test: (p: Project) => !p.published },
    { id: "featured", label: "Featured", test: (p: Project) => p.featured },
] as const;

type FilterId = (typeof filters)[number]["id"];

const iconBtn = "grid place-items-center w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors";

export default function ProjectsBoard({ projects, initialFilter }: { projects: Project[]; initialFilter?: string }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState<FilterId>(filters.some((f) => f.id === initialFilter) ? (initialFilter as FilterId) : "all");

    const q = query.trim().toLowerCase();
    const active = filters.find((f) => f.id === filter)!;
    const visible = projects.filter(
        (p) => active.test(p) && (!q || [p.title, p.category, p.url, ...p.tags].some((s) => s.toLowerCase().includes(q)))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-3 md:items-center justify-between">
                <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/[0.07] w-fit">
                    {filters.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => setFilter(f.id)}
                            className={clsx(
                                "px-3 h-8 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors",
                                filter === f.id ? "bg-white/[0.1] text-white" : "text-gray-400 hover:text-white"
                            )}
                        >
                            {f.label}
                            <span className="text-xs text-gray-500">{projects.filter(f.test).length}</span>
                        </button>
                    ))}
                </div>
                <div className="relative md:w-72">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search projects, tags..."
                        className="w-full h-10 bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500"
                    />
                </div>
            </div>

            {visible.length === 0 ? (
                <div className="glass-card p-14 text-center">
                    <p className="text-gray-400 mb-4">{projects.length ? "No projects match your search." : "You haven't added any projects yet."}</p>
                    {!projects.length && (
                        <Link href="/admin/projects/new" className="inline-flex items-center gap-2 h-10 px-5 rounded-xl bg-white text-black text-sm font-semibold">
                            <Plus className="w-4 h-4" /> Add your first project
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                    {visible.map((p) => (
                        <article key={p.id} className="group glass-card overflow-hidden flex flex-col hover:border-white/20 transition-colors">
                            <Link href={`/admin/projects/${p.id}`} className="relative block aspect-[16/10] bg-white/5 overflow-hidden">
                                {p.thumbnail ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={`/uploads/${p.thumbnail}`}
                                        alt=""
                                        className={clsx("w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]", !p.published && "grayscale-[60%] opacity-70")}
                                    />
                                ) : (
                                    <div className="w-full h-full grid place-items-center">
                                        <ImageOff className="w-8 h-8 text-gray-700" />
                                    </div>
                                )}
                                <span
                                    className={clsx(
                                        "absolute top-3 left-3 flex items-center gap-1.5 px-2.5 h-6 rounded-full text-[11px] font-semibold backdrop-blur-md",
                                        p.published ? "bg-black/75 text-emerald-300 ring-1 ring-inset ring-emerald-400/30" : "bg-black/75 text-gray-300 ring-1 ring-inset ring-white/10"
                                    )}
                                >
                                    <span className={clsx("w-1.5 h-1.5 rounded-full", p.published ? "bg-emerald-400" : "bg-gray-500")} />
                                    {p.published ? "Live" : "Hidden"}
                                </span>
                                {p.featured && (
                                    <span className="absolute top-3 right-3 grid place-items-center w-7 h-7 rounded-full bg-black/70 backdrop-blur-md">
                                        <Star className="w-3.5 h-3.5 text-amber-300 fill-current" />
                                    </span>
                                )}
                            </Link>

                            <div className="p-4 flex-1 flex flex-col gap-1">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="font-semibold truncate">{p.title}</h3>
                                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 shrink-0">{p.category}</span>
                                </div>
                                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 w-fit">
                                    {hostname(p.url)} <ExternalLink className="w-3 h-3" />
                                </a>
                                <span className="text-xs text-gray-600" suppressHydrationWarning>Updated {timeAgo(p.updatedAt)}</span>
                            </div>

                            <div className="flex items-center gap-1 px-3 py-2 border-t border-white/[0.06]">
                                <form action={toggleProject}>
                                    <input type="hidden" name="id" value={p.id} />
                                    <input type="hidden" name="field" value="published" />
                                    <ActionButton className={iconBtn} title={p.published ? "Hide from website" : "Show on website"}>
                                        {p.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </ActionButton>
                                </form>
                                <form action={toggleProject}>
                                    <input type="hidden" name="id" value={p.id} />
                                    <input type="hidden" name="field" value="featured" />
                                    <ActionButton className={iconBtn} title={p.featured ? "Remove from featured" : "Feature this project"}>
                                        <Star className={clsx("w-4 h-4", p.featured && "text-amber-300 fill-current")} />
                                    </ActionButton>
                                </form>
                                <form action={removeProject}>
                                    <input type="hidden" name="id" value={p.id} />
                                    <ConfirmButton
                                        title="Delete this project?"
                                        message={`"${p.title}" and its thumbnail will be permanently removed from your website.`}
                                        className={clsx(iconBtn, "hover:text-red-300 hover:bg-red-500/10")}
                                        aria-label="Delete project"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </ConfirmButton>
                                </form>
                                <Link
                                    href={`/admin/projects/${p.id}`}
                                    className="ml-auto flex items-center gap-1.5 h-9 px-3 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" /> Edit
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
