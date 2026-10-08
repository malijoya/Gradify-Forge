"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import type { Project } from "@/lib/db";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState("All");
    const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
    const visible = active === "All" ? projects : projects.filter((p) => p.category === active);
    const count = (c: string) => (c === "All" ? projects.length : projects.filter((p) => p.category === c).length);

    return (
        <>
            {categories.length > 2 && (
                <div role="group" aria-label="Filter by category" className="mb-10 flex flex-wrap gap-2">
                    {categories.map((c) => (
                        <button
                            key={c}
                            onClick={() => setActive(c)}
                            aria-pressed={active === c}
                            className={clsx(
                                "inline-flex items-center gap-2 h-9 px-3.5 rounded-full border font-mono text-[12px] transition-colors",
                                active === c
                                    ? "border-violet-300/40 bg-violet-500/15 text-white"
                                    : "border-white/10 bg-white/[0.03] text-gray-400 hover:text-white hover:border-white/20"
                            )}
                        >
                            {c.toLowerCase()}
                            <span className={active === c ? "text-violet-300" : "text-gray-600"}>{count(c)}</span>
                        </button>
                    ))}
                </div>
            )}

            <div key={active} className="stagger-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visible.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </>
    );
}
