import { requireAdmin } from "@/lib/auth";
import { listProjects } from "@/lib/db";
import { projectCategories } from "@/lib/site";
import PageHeader from "../../../_components/PageHeader";
import ProjectForm from "../../ProjectForm";

export default async function NewProject({ searchParams }: { searchParams: Promise<{ url?: string }> }) {
    await requireAdmin();
    const [projects, { url }] = await Promise.all([listProjects(), searchParams]);
    const categories = [...new Set([...projectCategories, ...projects.map((p) => p.category)])];

    return (
        <div className="animate-fade-in-up">
            <PageHeader title="New project" subtitle="Paste a link and we'll do the rest. Check the live preview before publishing." />
            <ProjectForm categories={categories} initialUrl={url} />
        </div>
    );
}
