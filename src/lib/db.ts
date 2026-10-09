import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * File-backed storage, edited locally through the admin panel:
 *
 * - content/projects.json  Committed to git. Push it and Vercel rebuilds the portfolio from it.
 * - data/inquiries.json    Contact-form messages when running locally. Git-ignored (it holds clients'
 *                          personal details). On the live site they go to Redis instead (see Inquiries below).
 *
 * The live site only reads projects at build time; it never writes files.
 */

const PROJECTS_FILE = path.join(process.cwd(), "content", "projects.json");
const INQUIRIES_FILE = path.join(process.cwd(), "data", "inquiries.json");

export type Project = {
    id: string;
    title: string;
    url: string;
    repoUrl?: string;
    description: string;
    category: string;
    tags: string[];
    thumbnail?: string; // file name inside public/uploads, served from /uploads/<name>
    featured: boolean;
    published: boolean;
    createdAt: string;
    updatedAt: string;
};

export type Inquiry = {
    id: string;
    name: string;
    email: string;
    company?: string;
    service?: string;
    budget?: string;
    message: string;
    read: boolean;
    createdAt: string;
};

function jsonList<T>(file: string) {
    async function load(): Promise<T[]> {
        try {
            return JSON.parse(await fs.readFile(file, "utf8"));
        } catch (err) {
            if ((err as NodeJS.ErrnoException).code === "ENOENT") return [];
            throw err;
        }
    }

    async function save(items: T[]) {
        await fs.mkdir(path.dirname(file), { recursive: true });
        const tmp = `${file}.${process.pid}.tmp`;
        await fs.writeFile(tmp, JSON.stringify(items, null, 2) + "\n");
        await fs.rename(tmp, file);
    }

    // Serialize writes so concurrent requests can't clobber each other.
    let queue: Promise<unknown> = Promise.resolve();
    function mutate<R>(fn: (items: T[]) => { items: T[]; result: R }): Promise<R> {
        const run = queue.then(async () => {
            const { items, result } = fn(await load());
            await save(items);
            return result;
        });
        queue = run.catch(() => undefined);
        return run;
    }

    return { load, mutate };
}

const projectsStore = jsonList<Project>(PROJECTS_FILE);
const inquiriesStore = jsonList<Inquiry>(INQUIRIES_FILE);

const newest = <T extends { createdAt: string }>(a: T, b: T) => b.createdAt.localeCompare(a.createdAt);

// ---------- Projects ----------

export async function listProjects(opts: { publishedOnly?: boolean } = {}) {
    const projects = await projectsStore.load();
    return projects
        .filter((p) => !opts.publishedOnly || p.published)
        .sort((a, b) => Number(b.featured) - Number(a.featured) || newest(a, b));
}

export async function getProject(id: string) {
    return (await projectsStore.load()).find((p) => p.id === id) ?? null;
}

export type ProjectInput = Omit<Project, "id" | "createdAt" | "updatedAt">;

export function createProject(input: ProjectInput) {
    return projectsStore.mutate((items) => {
        const now = new Date().toISOString();
        const project: Project = { ...input, id: randomUUID(), createdAt: now, updatedAt: now };
        return { items: [...items, project], result: project };
    });
}

export function updateProject(id: string, patch: Partial<ProjectInput>) {
    return projectsStore.mutate((items) => {
        const project = items.find((p) => p.id === id);
        if (project) Object.assign(project, patch, { updatedAt: new Date().toISOString() });
        return { items, result: project ?? null };
    });
}

export function deleteProject(id: string) {
    return projectsStore.mutate((items) => ({
        items: items.filter((p) => p.id !== id),
        result: items.find((p) => p.id === id) ?? null,
    }));
}

// ---------- Inquiries ----------
//
// Where contact-form messages are kept:
// - "redis": an Upstash Redis database (add it from Vercel > Storage). Works on the live site.
// - "file":  data/inquiries.json, only where the full admin panel runs (on your computer).
// - null:    nowhere; messages are only emailed.

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const INQUIRIES_KEY = "inquiries";

export function inquiryStorage(): "redis" | "file" | null {
    if (REDIS_URL && REDIS_TOKEN) return "redis";
    if (process.env.NODE_ENV !== "production" || process.env.ENABLE_ADMIN === "true") return "file";
    return null;
}

/** Runs one Redis command over Upstash's REST API (no client library needed). */
async function redis<T>(...command: string[]): Promise<T> {
    const res = await fetch(REDIS_URL!, {
        method: "POST",
        headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(command),
        cache: "no-store",
        signal: AbortSignal.timeout(8000),
    });
    const body = (await res.json()) as { result?: T; error?: string };
    if (!res.ok || body.error) throw new Error(`Redis ${command[0]} failed: ${body.error ?? res.status}`);
    return body.result as T;
}

export async function listInquiries(): Promise<Inquiry[]> {
    const storage = inquiryStorage();
    if (storage === "redis") {
        // HGETALL returns [id, json, id, json, ...]
        const flat = await redis<string[]>("HGETALL", INQUIRIES_KEY);
        const items: Inquiry[] = [];
        for (let i = 1; i < flat.length; i += 2) items.push(JSON.parse(flat[i]));
        return items.sort(newest);
    }
    if (storage === "file") return (await inquiriesStore.load()).sort(newest);
    return [];
}

export async function createInquiry(input: Omit<Inquiry, "id" | "createdAt" | "read">) {
    const inquiry: Inquiry = { ...input, id: randomUUID(), read: false, createdAt: new Date().toISOString() };
    const storage = inquiryStorage();
    if (storage === "redis") await redis("HSET", INQUIRIES_KEY, inquiry.id, JSON.stringify(inquiry));
    else if (storage === "file") await inquiriesStore.mutate((items) => ({ items: [...items, inquiry], result: undefined }));
    return inquiry;
}

export async function setInquiryRead(id: string, read: boolean) {
    if (inquiryStorage() === "redis") {
        const json = await redis<string | null>("HGET", INQUIRIES_KEY, id);
        if (json) await redis("HSET", INQUIRIES_KEY, id, JSON.stringify({ ...JSON.parse(json), read }));
        return;
    }
    await inquiriesStore.mutate((items) => {
        const inquiry = items.find((i) => i.id === id);
        if (inquiry) inquiry.read = read;
        return { items, result: undefined };
    });
}

export async function deleteInquiry(id: string) {
    if (inquiryStorage() === "redis") {
        await redis("HDEL", INQUIRIES_KEY, id);
        return;
    }
    await inquiriesStore.mutate((items) => ({ items: items.filter((i) => i.id !== id), result: undefined }));
}
