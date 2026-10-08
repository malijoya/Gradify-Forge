import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { adminEnabled, isAdmin } from "@/lib/auth";
import { site } from "@/lib/site";
import Background from "@/components/Background";
import LogoMark from "@/components/LogoMark";
import LoginForm from "./LoginForm";

export const metadata: Metadata = { title: "Admin Login", robots: { index: false } };

export default async function LoginPage() {
    if (!adminEnabled()) notFound();
    if (await isAdmin()) redirect("/admin");

    return (
        <div className="relative isolate min-h-screen flex flex-col items-center justify-center p-6">
            <Background />
            <div className="w-full max-w-sm animate-fade-in-up">
                <div className="flex flex-col items-center text-center mb-8">
                    <LogoMark className="w-20 h-20 p-[3px] mb-5" />
                    <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-gray-400 text-sm mt-1">Sign in to manage {site.name}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0b0b14]/80 backdrop-blur-xl p-6 shadow-2xl">
                    {process.env.ADMIN_PASSWORD ? (
                        <LoginForm />
                    ) : (
                        <p className="text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-xl p-4">
                            No admin password configured. Add <code>ADMIN_PASSWORD=...</code> to <code>.env.local</code> and restart the server.
                        </p>
                    )}
                </div>

                <Link href="/" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to website
                </Link>
            </div>
        </div>
    );
}
