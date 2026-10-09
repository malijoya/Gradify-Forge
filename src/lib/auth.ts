import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

/**
 * - "full":  everything, including project editing. Project editing writes files in the repo
 *            (content/, public/uploads/), so this only runs locally (or with ENABLE_ADMIN=true).
 * - "inbox": the live site, once ADMIN_PASSWORD is set in Vercel. Only login and Inquiries.
 * - "off":   no admin at all.
 */
export function adminMode(): "full" | "inbox" | "off" {
    if (process.env.NODE_ENV !== "production" || process.env.ENABLE_ADMIN === "true") return "full";
    return process.env.ADMIN_PASSWORD ? "inbox" : "off";
}

export function adminEnabled() {
    return adminMode() !== "off";
}

const COOKIE = "gf_admin";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secret() {
    const s = process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD;
    if (!s) throw new Error("Set ADMIN_PASSWORD (and ideally ADMIN_SECRET) in .env.local");
    return s;
}

function sign(value: string) {
    return createHmac("sha256", secret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
    const ab = Buffer.from(a);
    const bb = Buffer.from(b);
    return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function checkPassword(password: string) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || !adminEnabled()) return false;
    // Compare HMACs so the comparison is constant-time regardless of length.
    return safeEqual(sign(password), sign(expected));
}

export async function createSession() {
    const expires = String(Date.now() + MAX_AGE * 1000);
    (await cookies()).set(COOKIE, `${expires}.${sign(expires)}`, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: MAX_AGE,
    });
}

export async function destroySession() {
    (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
    if (!adminEnabled()) return false;
    const token = (await cookies()).get(COOKIE)?.value;
    if (!token) return false;
    const [expires, sig] = token.split(".");
    if (!expires || !sig || !safeEqual(sig, sign(expires))) return false;
    return Number(expires) > Date.now();
}

/** Call at the top of every project-management page and server action (full admin only). */
export async function requireAdmin() {
    if (adminMode() !== "full") notFound();
    if (!(await isAdmin())) redirect("/admin/login");
}

/** For the inquiries inbox, which also works on the live site. */
export async function requireInboxAdmin() {
    if (!adminEnabled()) notFound();
    if (!(await isAdmin())) redirect("/admin/login");
}
