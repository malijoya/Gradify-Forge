import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { getProject, listProjects } from "@/lib/db";
import { timeAgo } from "@/lib/format";
import { projectCategories } from "@/lib/site";
import PageHeader from "../../../_components/PageHeader";
import ProjectForm from "../../ProjectForm";

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
    await requireAdmin();
    const { id } = await params;
    const [project, projects] = await Promise.all([getProject(id), listProjects()]);
    if (!project) notFound();
    const categories = [...new Set([...projectCategories, ...projects.map((p) => p.category)])];

    return (
        <div className="animate-fade-in-up">
            <PageHeader
                title="Edit project"
                subtitle={`Last updated ${timeAgo(project.updatedAt)}`}
                actions={
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 h-10 px-4 rounded-xl border border-white/10 text-sm text-gray-300 hover:bg-white/[0.06]">
                        Open site <ExternalLink className="w-4 h-4" />
                    </a>
                }
            />
            <ProjectForm project={project} categories={categories} />
        </div>
    );
}
