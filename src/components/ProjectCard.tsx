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
        <article className="group relative rounded-3xl overflow-hidden glass-card border-white/10 hover:border-purple-500/40 transition-colors flex flex-col">
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="block relative aspect-[16/10] overflow-hidden bg-white/5">
                {src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={project.title}
                        loading="lazy"
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
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity px-5 py-2 rounded-full bg-white text-black text-sm font-bold flex items-center gap-2">
                        Visit project <ExternalLink className="w-4 h-4" />
                    </span>
                </div>
                {project.featured && (
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/70 backdrop-blur text-xs font-bold text-yellow-300 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> Featured
                    </span>
                )}
            </a>

            <div className="p-6 space-y-3 flex-1 flex flex-col">
                <div className="flex justify-between items-start gap-4">
                    <div className="min-w-0">
                        <h3 className="text-xl font-bold text-white truncate">{project.title}</h3>
                        <p className="text-sm text-purple-400 font-medium">{project.category}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        {project.repoUrl && (
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="Source code"
                                className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                                <Github className="w-5 h-5 text-gray-300" />
                            </a>
                        )}
                        <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label="Live project"
                            className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                            <ExternalLink className="w-5 h-5 text-gray-300" />
                        </a>
                    </div>
                </div>

                {project.description && <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">{project.description}</p>}

                <div className="flex gap-2 flex-wrap pt-1 mt-auto">
                    {project.tags.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                            {t}
                        </span>
                    ))}
                    <span className="text-xs px-3 py-1 text-gray-500">{hostname(project.url)}</span>
                </div>
            </div>
        </article>
    );
}
