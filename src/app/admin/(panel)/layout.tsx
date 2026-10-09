import { Suspense } from "react";
import type { Metadata } from "next";
import { adminMode, requireInboxAdmin } from "@/lib/auth";
import { listInquiries, listProjects } from "@/lib/db";
import Background from "@/components/Background";
import AdminNav from "../_components/AdminNav";
import Toast from "../_components/Toast";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Admin", robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    await requireInboxAdmin();
    const full = adminMode() === "full";
    const [projects, inquiries] = await Promise.all([full ? listProjects() : [], listInquiries()]);

    return (
        <div className="relative isolate min-h-screen">
            <Background />
            <AdminNav full={full} projectCount={projects.length} unread={inquiries.filter((i) => !i.read).length} />
            <div className="lg:pl-64">
                <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 lg:py-10">{children}</main>
            </div>
            <Suspense>
                <Toast />
            </Suspense>
        </div>
    );
}
