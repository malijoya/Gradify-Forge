"use client";

import { useMemo, useState } from "react";
import { clsx } from "clsx";
import type { Project } from "@/lib/db";
import ProjectCard from "./ProjectCard";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
    const [active, setActive] = useState("All");
    const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
    const visible = active === "All" ? projects : projects.filter((p) => p.category === active);

    return (
        <>
            {categories.length > 2 && (
                <div className="flex justify-center mb-12">
                    <div className="flex flex-wrap justify-center gap-2 p-1 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md">
                        {categories.map((c) => (
                            <button
                                key={c}
                                onClick={() => setActive(c)}
                                className={clsx(
                                    "px-5 py-2 rounded-full text-sm font-bold transition-all",
                                    active === c ? "bg-purple-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div key={active} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
                {visible.map((p) => (
                    <ProjectCard key={p.id} project={p} />
                ))}
            </div>
        </>
    );
}
