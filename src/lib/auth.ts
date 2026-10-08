import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

/**
 * The admin panel edits files in the repo (content/, public/uploads/), so it only runs locally.
 * On the deployed site it doesn't exist. Set ENABLE_ADMIN=true to override (e.g. `next start` on your machine).
 */
export function adminEnabled() {
    return process.env.NODE_ENV !== "production" || process.env.ENABLE_ADMIN === "true";
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

/** Call at the top of every admin page and server action. */
export async function requireAdmin() {
    if (!adminEnabled()) notFound();
    if (!(await isAdmin())) redirect("/admin/login");
}
