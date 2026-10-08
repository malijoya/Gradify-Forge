"use server";

import { revalidatePath } from "next/cache";
import { adminEnabled } from "@/lib/auth";
import { createInquiry, type Inquiry } from "@/lib/db";
import { site } from "@/lib/site";

export type ContactState = { ok?: boolean; error?: string } | undefined;

type NewInquiry = Omit<Inquiry, "id" | "createdAt" | "read">;

/** Email the inquiry to you through Resend (https://resend.com). Returns false when it isn't configured. */
async function emailInquiry(q: NewInquiry) {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;
    if (!apiKey || !to) return false;

    const lines = [
        `Name: ${q.name}`,
        `Email: ${q.email}`,
        q.company && `Company: ${q.company}`,
        q.service && `Service: ${q.service}`,
        q.budget && `Budget: ${q.budget}`,
        "",
        q.message,
    ].filter((l) => typeof l === "string");

    const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || `${site.name} Website <onboarding@resend.dev>`,
            to: [to],
            reply_to: q.email,
            subject: `New project inquiry from ${q.name}`,
            text: lines.join("\n"),
        }),
        signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
    return true;
}

export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
    const str = (k: string, max: number) => String(formData.get(k) ?? "").trim().slice(0, max);

    // Honeypot field: real users never see it, bots fill it in.
    if (str("website", 200)) return { ok: true };

    const name = str("name", 120);
    const email = str("email", 200);
    const message = str("message", 5000);

    if (!name || !email || !message) return { error: "Please fill in your name, email and message." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Please enter a valid email address." };

    const inquiry: NewInquiry = {
        name,
        email,
        message,
        company: str("company", 200) || undefined,
        service: str("service", 100) || undefined,
        budget: str("budget", 100) || undefined,
    };

    let delivered = false;
    try {
        delivered = await emailInquiry(inquiry);
    } catch (err) {
        console.error("Failed to email inquiry:", err);
    }

    // Locally (where the admin panel runs) inquiries are also kept in data/inquiries.json.
    if (adminEnabled()) {
        await createInquiry(inquiry);
        revalidatePath("/admin", "layout");
        delivered = true;
    }

    if (!delivered) {
        return { error: `Sorry, your message couldn't be sent. Please email us directly at ${site.email}.` };
    }
    return { ok: true };
}
