"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, createSession, destroySession, requireAdmin, requireInboxAdmin } from "@/lib/auth";
import {
    createProject,
    deleteInquiry,
    deleteProject,
    getProject,
    setInquiryRead,
    updateProject,
    type ProjectInput,
} from "@/lib/db";
import { downloadImage, fetchLinkPreview, type LinkPreview } from "@/lib/preview";
import { screenshotUrl } from "@/lib/screenshot";
import { deleteImage, saveImage } from "@/lib/uploads";

function refreshSite() {
    revalidatePath("/", "layout");
}

// ---------- Auth ----------

export async function login(_prev: { error?: string } | undefined, formData: FormData) {
    const password = String(formData.get("password") ?? "");
    if (!checkPassword(password)) {
        await new Promise((r) => setTimeout(r, 800)); // slow down guessing
        return { error: "Wrong password." };
    }
    await createSession();
    redirect("/admin");
}

export async function logout() {
    await destroySession();
    redirect("/admin/login");
}

// ---------- Link preview ----------

export async function previewLink(url: string): Promise<LinkPreview & { error?: string }> {
    await requireAdmin();
    try {
        return await fetchLinkPreview(url.trim());
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Couldn't read that link." };
    }
}

// ---------- Projects ----------

export type ProjectFormState = { error?: string } | undefined;

/**
 * Resolve the thumbnail from the form. Priority:
 * uploaded file > "screenshot" mode > remote image URL (og:image) > keep existing.
 */
async function resolveThumbnail(formData: FormData, siteUrl: string, existing?: string) {
    const file = formData.get("thumbnailFile");
    if (file instanceof File && file.size > 0) {
        return saveImage(Buffer.from(await file.arrayBuffer()));
    }
    const mode = String(formData.get("thumbnailMode") ?? "");
    if (mode === "screenshot") {
        return saveImage(await downloadImage(screenshotUrl(siteUrl)));
    }
    const remote = String(formData.get("thumbnailRemote") ?? "").trim();
    if (mode === "remote" && remote) {
        return saveImage(await downloadImage(remote));
    }
    if (mode === "none") return undefined;
    return existing;
}

function parseProject(formData: FormData): Omit<ProjectInput, "thumbnail"> {
    const str = (k: string) => String(formData.get(k) ?? "").trim();
    const url = str("url");
    const title = str("title");
    if (!title) throw new Error("Title is required.");
    try {
        const u = new URL(url);
        if (!/^https?:$/.test(u.protocol)) throw new Error();
    } catch {
        throw new Error("Project link must be a valid http(s) URL.");
    }
    const repoUrl = str("repoUrl");
    if (repoUrl && !/^https?:\/\//i.test(repoUrl)) throw new Error("Repository link must start with http(s)://");

    return {
        title,
        url,
        repoUrl: repoUrl || undefined,
        description: str("description"),
        category: str("category") || "Other",
        tags: str("tags")
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        featured: formData.get("featured") === "on",
        published: formData.get("published") === "on",
    };
}

export async function saveProject(_prev: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
    await requireAdmin();
    const id = String(formData.get("id") ?? "");
    try {
        const fields = parseProject(formData);
        const existing = id ? await getProject(id) : null;
        if (id && !existing) return { error: "Project not found." };

        const thumbnail = await resolveThumbnail(formData, fields.url, existing?.thumbnail);
        if (existing && existing.thumbnail !== thumbnail) await deleteImage(existing.thumbnail);

        if (existing) await updateProject(id, { ...fields, thumbnail });
        else await createProject({ ...fields, thumbnail });
    } catch (err) {
        return { error: err instanceof Error ? err.message : "Something went wrong." };
    }
    refreshSite();
    redirect(`/admin/projects?toast=${id ? "updated" : "created"}`);
}

export async function removeProject(formData: FormData) {
    await requireAdmin();
    const project = await deleteProject(String(formData.get("id")));
    await deleteImage(project?.thumbnail);
    refreshSite();
    redirect("/admin/projects?toast=deleted");
}

export async function toggleProject(formData: FormData) {
    await requireAdmin();
    const id = String(formData.get("id"));
    const field = String(formData.get("field"));
    if (field !== "published" && field !== "featured") return;
    const project = await getProject(id);
    if (!project) return;
    await updateProject(id, { [field]: !project[field] });
    refreshSite();
}

// ---------- Inquiries ----------

export async function markInquiry(formData: FormData) {
    await requireInboxAdmin();
    await setInquiryRead(String(formData.get("id")), formData.get("read") === "true");
    revalidatePath("/admin", "layout");
}

export async function removeInquiry(formData: FormData) {
    await requireInboxAdmin();
    await deleteInquiry(String(formData.get("id")));
    revalidatePath("/admin", "layout");
    redirect("/admin/inquiries?toast=inquiry-deleted");
}
