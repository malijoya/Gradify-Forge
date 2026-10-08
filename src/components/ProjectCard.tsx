import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/lib/db";
import { hostname } from "@/lib/format";

const gradients = [
    "from-pink-500 to-rose-500",
    "from-blue-400 to-cyan-300",
    "from-purple-500 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-amber-400 to-orange-500",
];

/** `imageSrc` overrides the stored thumbnail; the admin form uses it for its live preview. */
export default function ProjectCard({ project, imageSrc }: { project: Project; imageSrc?: string }) {
    const gradient = gradients[project.title.length % gradients.length];
    const src = imageSrc ?? (project.thumbnail ? `/uploads/${project.thumbnail}` : undefined);

    return (
        <article className="group relative rounded-[18px] overflow-hidden home-card hover:border-violet-300/30 transition-colors flex flex-col">
            <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative aspect-[16/10] overflow-hidden bg-white/5 border-b border-white/[0.06]"
            >
                {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={project.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${gradient} opacity-80 flex items-center justify-center`}>
                        <span className="text-white/70 font-bold text-3xl uppercase tracking-widest mix-blend-overlay px-6 text-center">
                            {project.category}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity h-10 px-4 rounded-full bg-white text-black text-sm font-medium flex items-center gap-2">
                        Visit project <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
                {project.featured && (
                    <span className="absolute top-3 left-3 h-6 px-2.5 rounded-md border border-white/10 bg-black/80 font-mono text-[11px] text-violet-200 flex items-center gap-1.5">
                        <Star className="w-3 h-3 fill-current" /> featured
                    </span>
                )}
            </a>

            <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                        <h3 className="text-[17px] font-medium tracking-tight text-white truncate">{project.title}</h3>
                        <p className="mt-1 font-mono text-[12px] text-violet-300">{project.category.toLowerCase()}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Source code"
                                className="grid place-items-center w-9 h-9 rounded-[10px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] transition-colors"
                            >
                                <Github className="w-4 h-4 text-gray-300" />
                            </a>
                        )}
                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Live project"
                            className="grid place-items-center w-9 h-9 rounded-[10px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.1] transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-gray-300" />
                        </a>
                    </div>
                </div>

                {project.description && <p className="text-gray-400 text-[14px] leading-relaxed line-clamp-3">{project.description}</p>}

                <div className="flex gap-2 flex-wrap pt-1 mt-auto">
                    {project.tags.map((t) => (
                        <span key={t} className="h-6 px-2 inline-flex items-center rounded border border-white/10 bg-white/[0.03] font-mono text-[11px] text-gray-400">
                            {t}
                        </span>
                    ))}
                    <span className="h-6 inline-flex items-center px-1 font-mono text-[11px] text-gray-600">{hostname(project.url)}</span>
                </div>
            </div>
        </article>
    );
}
