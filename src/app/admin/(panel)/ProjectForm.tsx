"use client";

import { useActionState, useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { AlertCircle, Camera, CheckCircle2, ImageOff, ImagePlus, Link2, Loader2, Sparkles, Upload, Wand2 } from "lucide-react";
import { clsx } from "clsx";
import type { Project } from "@/lib/db";
import { screenshotUrl } from "@/lib/screenshot";
import ProjectCard from "@/components/ProjectCard";
import { previewLink, saveProject, type ProjectFormState } from "../actions";
import CategoryPicker from "../_components/CategoryPicker";
import TagInput from "../_components/TagInput";
import Toggle from "../_components/Toggle";

type Mode = "keep" | "remote" | "screenshot" | "upload" | "none";
type FetchStatus = { kind: "ok" | "warn" | "error"; text: string } | null;

const MAX_UPLOAD = 5 * 1024 * 1024;
const URL_RE = /^https?:\/\/\S+\.\S+/i;

const input =
    "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder:text-gray-600 transition-colors";

function Section({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
    return (
        <section className="glass-card p-6 space-y-5">
            <div>
                <h2 className="font-semibold text-white">{title}</h2>
                {hint && <p className="text-xs text-gray-500 mt-0.5">{hint}</p>}
            </div>
            {children}
        </section>
    );
}

function Field({ label, children, aside }: { label: string; children: React.ReactNode; aside?: React.ReactNode }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                {aside}
            </div>
            {children}
        </div>
    );
}

export default function ProjectForm({ project, categories, initialUrl }: { project?: Project; categories: string[]; initialUrl?: string }) {
    const [state, action, saving] = useActionState<ProjectFormState, FormData>(saveProject, undefined);
    const [, startSubmit] = useTransition();
    const [fetching, startFetch] = useTransition();
    const [status, setStatus] = useState<FetchStatus>(null);

    const [url, setUrl] = useState(project?.url ?? initialUrl ?? "");
    const [title, setTitle] = useState(project?.title ?? "");
    const [description, setDescription] = useState(project?.description ?? "");
    const [category, setCategory] = useState(project?.category ?? "Web App");
    const [repoUrl, setRepoUrl] = useState(project?.repoUrl ?? "");
    const [tags, setTags] = useState<string[]>(project?.tags ?? []);
    const [published, setPublished] = useState(project?.published ?? true);
    const [featured, setFeatured] = useState(project?.featured ?? false);

    const [mode, setMode] = useState<Mode>(project?.thumbnail ? "keep" : "screenshot");
    const [remote, setRemote] = useState("");
    const [uploadPreview, setUploadPreview] = useState<string>();
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => () => { if (uploadPreview) URL.revokeObjectURL(uploadPreview); }, [uploadPreview]);

    const validUrl = URL_RE.test(url.trim());

    function fetchDetails(target = url, overwrite = false) {
        if (!URL_RE.test(target.trim())) return;
        setStatus(null);
        startFetch(async () => {
            const res = await previewLink(target);
            if (res.error) {
                setStatus({ kind: "error", text: res.error });
                return;
            }
            if (res.title && (overwrite || !title)) setTitle(res.title.slice(0, 120));
            if (res.description && (overwrite || !description)) setDescription(res.description);
            if (res.image) {
                setRemote(res.image);
                setMode((m) => (m === "upload" ? m : "remote"));
                setStatus({ kind: "ok", text: "Title, description and preview image found." });
            } else {
                setMode((m) => (m === "remote" ? "screenshot" : m));
                setStatus({ kind: "warn", text: "No preview image on that page. A screenshot of the site will be used." });
            }
        });
    }

    // Arriving from the dashboard's quick-add box: fetch details right away (once, even in Strict Mode).
    const autoFetched = useRef(false);
    useEffect(() => {
        if (initialUrl && !project && !autoFetched.current) {
            autoFetched.current = true;
            fetchDetails(initialUrl, true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function applyFile(file?: File) {
        if (!file) return;
        if (!/^image\/(png|jpe?g|webp|gif)$/.test(file.type)) {
            setStatus({ kind: "error", text: "Thumbnail must be a PNG, JPG, WEBP or GIF image." });
            return;
        }
        if (file.size > MAX_UPLOAD) {
            setStatus({ kind: "error", text: "Image is larger than 5 MB." });
            return;
        }
        if (fileRef.current) {
            const dt = new DataTransfer();
            dt.items.add(file);
            fileRef.current.files = dt.files;
        }
        setUploadPreview(URL.createObjectURL(file));
        setMode("upload");
    }

    const imageSrc =
        mode === "keep" ? (project?.thumbnail ? `/uploads/${project.thumbnail}` : undefined)
        : mode === "remote" ? remote || undefined
        : mode === "screenshot" ? (validUrl ? screenshotUrl(url.trim()) : undefined)
        : mode === "upload" ? uploadPreview
        : undefined;

    const draft: Project = {
        id: project?.id ?? "draft",
        title: title || "Your project title",
        url: validUrl ? url.trim() : "https://example.com",
        repoUrl: repoUrl || undefined,
        description: description || "A short description of the project will appear here.",
        category: category || "Other",
        tags,
        featured,
        published,
        createdAt: "",
        updatedAt: "",
    };

    const modes: { id: Mode; label: string; icon: typeof Camera; show: boolean }[] = [
        { id: "keep", label: "Current", icon: CheckCircle2, show: !!project?.thumbnail },
        { id: "remote", label: "From link", icon: Sparkles, show: !!remote },
        { id: "screenshot", label: "Screenshot", icon: Camera, show: true },
        { id: "upload", label: "Upload", icon: Upload, show: true },
        { id: "none", label: "None", icon: ImageOff, show: true },
    ];

    return (
        <form
            // Submit manually so React doesn't reset the form (and the chosen file) when saving fails.
            onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                startSubmit(() => action(fd));
            }}
            className="grid lg:grid-cols-[minmax(0,1fr)_400px] gap-6 items-start"
        >
            {project && <input type="hidden" name="id" value={project.id} />}
            <input type="hidden" name="thumbnailMode" value={mode} />
            <input type="hidden" name="thumbnailRemote" value={remote} />
            <input
                ref={fileRef}
                type="file"
                name={mode === "upload" ? "thumbnailFile" : undefined}
                accept="image/png,image/jpeg,image/webp,image/gif"
                className="hidden"
                onChange={(e) => applyFile(e.target.files?.[0])}
            />

            <div className="space-y-6 min-w-0">
                <Section title="Project link" hint="Paste the live URL. We'll pull the title, description and an image from it.">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                name="url"
                                type="url"
                                required
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                onPaste={(e) => {
                                    const pasted = e.clipboardData.getData("text").trim();
                                    if (!title) setTimeout(() => fetchDetails(pasted), 0);
                                }}
                                placeholder="https://your-project.com"
                                className={clsx(input, "pl-10")}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => fetchDetails(url, true)}
                            disabled={!validUrl || fetching}
                            className="px-4 rounded-xl bg-white/[0.06] border border-white/10 hover:bg-white/[0.12] disabled:opacity-40 font-semibold text-sm flex items-center gap-2 shrink-0 transition-colors"
                        >
                            {fetching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4 text-purple-300" />}
                            <span className="hidden sm:inline">{fetching ? "Reading site..." : "Auto-fill"}</span>
                        </button>
                    </div>
                    {status && (
                        <p
                            className={clsx(
                                "flex items-start gap-2 text-sm rounded-xl px-3 py-2.5 border",
                                status.kind === "ok" && "text-emerald-300 bg-emerald-500/10 border-emerald-500/20",
                                status.kind === "warn" && "text-amber-300 bg-amber-500/10 border-amber-500/20",
                                status.kind === "error" && "text-red-300 bg-red-500/10 border-red-500/20"
                            )}
                        >
                            {status.kind === "ok" ? <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" /> : <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />}
                            {status.text}
                        </p>
                    )}
                </Section>

                <Section title="Details">
                    <Field label="Title" aside={<span className="text-xs text-gray-600">{title.length}/120</span>}>
                        <input name="title" required maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} className={input} placeholder="E-commerce platform for Acme" />
                    </Field>
                    <Field label="Description" aside={<span className="text-xs text-gray-600">{description.length} chars</span>}>
                        <textarea
                            name="description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={clsx(input, "resize-y min-h-28")}
                            placeholder="What it does, who it's for, the results it achieved..."
                        />
                    </Field>
                    <div className="grid md:grid-cols-2 gap-5">
                        <Field label="Category">
                            <CategoryPicker name="category" options={categories} value={category} onChange={setCategory} />
                        </Field>
                        <Field label="Source code (optional)">
                            <input name="repoUrl" type="url" value={repoUrl} onChange={(e) => setRepoUrl(e.target.value)} className={input} placeholder="https://github.com/..." />
                        </Field>
                    </div>
                    <Field label="Technologies">
                        <TagInput name="tags" tags={tags} onChange={setTags} />
                    </Field>
                </Section>

                <Section title="Visibility">
                    <div className="grid sm:grid-cols-2 gap-3">
                        <Toggle name="published" label="Show on website" description="Visible on Home and Portfolio" checked={published} onChange={setPublished} />
                        <Toggle name="featured" label="Featured" description="Pinned to the top with a badge" checked={featured} onChange={setFeatured} />
                    </div>
                </Section>
            </div>

            <div className="space-y-4 lg:sticky lg:top-6">
                <div
                    className="glass-card p-5 space-y-4"
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        applyFile(e.dataTransfer.files?.[0]);
                    }}
                >
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Live preview</h2>
                        <span className="text-xs text-gray-500">How visitors will see it</span>
                    </div>

                    <div className={clsx("relative transition-transform", dragging && "scale-[0.98]", !published && "opacity-60")}>
                        <div className="pointer-events-none">
                            <ProjectCard project={draft} imageSrc={imageSrc} />
                        </div>
                        {dragging && (
                            <div className="absolute inset-0 rounded-3xl border-2 border-dashed border-purple-400 bg-purple-500/15 backdrop-blur-sm grid place-items-center">
                                <span className="flex items-center gap-2 font-semibold"><ImagePlus className="w-5 h-5" /> Drop to use as thumbnail</span>
                            </div>
                        )}
                        {!published && (
                            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 text-xs font-semibold text-gray-300">Hidden</span>
                        )}
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Thumbnail source</span>
                        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-black/30 border border-white/[0.06]">
                            {modes.filter((m) => m.show).map((m) => (
                                <button
                                    key={m.id}
                                    type="button"
                                    onClick={() => (m.id === "upload" ? fileRef.current?.click() : setMode(m.id))}
                                    className={clsx(
                                        "flex-1 min-w-fit px-2.5 h-8 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors",
                                        mode === m.id ? "bg-white/[0.1] text-white shadow-sm" : "text-gray-400 hover:text-white"
                                    )}
                                >
                                    <m.icon className="w-3.5 h-3.5" /> {m.label}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            {mode === "screenshot" && "A screenshot of the live site is captured when you save (takes a few seconds)."}
                            {mode === "remote" && "The site's own preview image is downloaded and stored."}
                            {mode === "upload" && "Your image will be uploaded. PNG, JPG, WEBP or GIF up to 5 MB."}
                            {mode === "keep" && "Keeping the current thumbnail."}
                            {mode === "none" && "A gradient card with the category name is shown instead."}
                            {" "}You can also drag an image onto the preview.
                        </p>
                    </div>
                </div>

                {state?.error && (
                    <p className="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" /> {state.error}
                    </p>
                )}

                <div className="flex gap-2">
                    <Link href="/admin/projects" className="h-12 px-5 rounded-xl border border-white/10 text-sm font-medium text-gray-300 hover:bg-white/[0.06] grid place-items-center transition-colors">
                        Cancel
                    </Link>
                    <button
                        disabled={saving || fetching}
                        className="flex-1 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-purple-900/30 transition-opacity"
                    >
                        {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                        {saving ? (mode === "screenshot" ? "Capturing & saving..." : "Saving...") : project ? "Save changes" : published ? "Publish project" : "Save as hidden"}
                    </button>
                </div>
            </div>
        </form>
    );
}
