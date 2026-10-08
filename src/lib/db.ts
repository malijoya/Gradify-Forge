import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { randomUUID } from "crypto";

/**
 * File-backed storage, edited locally through the admin panel:
 *
 * - content/projects.json  Committed to git. Push it and Vercel rebuilds the portfolio from it.
 * - data/inquiries.json    Contact-form messages. Git-ignored (it holds clients' personal details).
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

export async function listInquiries() {
    return (await inquiriesStore.load()).sort(newest);
}

export function createInquiry(input: Omit<Inquiry, "id" | "createdAt" | "read">) {
    return inquiriesStore.mutate((items) => {
        const inquiry: Inquiry = { ...input, id: randomUUID(), read: false, createdAt: new Date().toISOString() };
        return { items: [...items, inquiry], result: inquiry };
    });
}

export function setInquiryRead(id: string, read: boolean) {
    return inquiriesStore.mutate((items) => {
        const inquiry = items.find((i) => i.id === id);
        if (inquiry) inquiry.read = read;
        return { items, result: undefined };
    });
}

export function deleteInquiry(id: string) {
    return inquiriesStore.mutate((items) => ({ items: items.filter((i) => i.id !== id), result: undefined }));
}
