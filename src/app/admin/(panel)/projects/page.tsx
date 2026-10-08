import Link from "next/link";
import { Plus } from "lucide-react";
import { requireAdmin } from "@/lib/auth";
import { listProjects } from "@/lib/db";
import PageHeader from "../../_components/PageHeader";
import ProjectsBoard from "../../_components/ProjectsBoard";

export default async function ProjectsPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
    await requireAdmin();
    const [projects, { filter }] = await Promise.all([listProjects(), searchParams]);
    const live = projects.filter((p) => p.published).length;

    return (
        <div className="animate-fade-in-up">
            <PageHeader
                title="Projects"
                subtitle={`${projects.length} total · ${live} live on your website`}
                actions={
                    <Link href="/admin/projects/new" className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors">
                        <Plus className="w-4 h-4" /> New project
                    </Link>
                }
            />
            <ProjectsBoard projects={projects} initialFilter={filter} />
        </div>
    );
}
