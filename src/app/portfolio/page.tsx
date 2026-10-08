import type { Metadata } from "next";
import Link from "next/link";
import { Layers } from "lucide-react";
import { listProjects } from "@/lib/db";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = { title: "Portfolio" };

export default async function Portfolio() {
    const projects = await listProjects({ publishedOnly: true });

    return (
        <div className="min-h-screen py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Our <span className="text-gradient">Portfolio</span>
                </h1>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-lg">
                    Real products we&apos;ve shipped for our clients. Click any project to see it live.
                </p>

                {projects.length > 0 ? (
                    <PortfolioGrid projects={projects} />
                ) : (
                    <div className="glass-card p-16 text-center max-w-xl mx-auto">
                        <Layers className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold mb-2">New projects coming soon</h2>
                        <p className="text-gray-400 mb-6">We&apos;re putting together our latest work. In the meantime, let&apos;s talk about yours.</p>
                        <Link href="/contact" className="inline-block px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-500 font-bold">
                            Contact us
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
