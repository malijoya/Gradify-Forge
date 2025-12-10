"use client";

import { ExternalLink, Github, FileText, PlayCircle, Download, FileJson } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

type TabId = "projects" | "thesis" | "media";

export default function Portfolio() {
    const [activeTab, setActiveTab] = useState<TabId>("projects");

    const projects = [
        {
            title: "E-Commerce Platform",
            category: "Web Development",
            description: "A full-featured online store with payment processing and admin dashboard.",
            tech: ["Next.js", "Stripe", "Tailwind"],
            color: "from-pink-500 to-rose-500"
        },
        {
            title: "Finance Tracker App",
            category: "Mobile App",
            description: "Personal finance management application with data visualization.",
            tech: ["Flutter", "Firebase"],
            color: "from-blue-400 to-cyan-300"
        },
        {
            title: "Corporate Identity",
            category: "Branding",
            description: "Complete brand overhaul including logo, stationary, and design system.",
            tech: ["Figma", "Illustrator"],
            color: "from-purple-500 to-indigo-500"
        },
        {
            title: "Health Tech Dashboard",
            category: "SaaS",
            description: "Real-time health monitoring dashboard for medical professionals.",
            tech: ["React", "D3.js", "Node.js"],
            color: "from-emerald-400 to-teal-500"
        }
    ];

    const theses = [
        {
            title: "AI-Driven Traffic Management System",
            type: "Final Year Thesis",
            pages: 120,
            format: "PDF",
            description: "Comprehensive research on using computer vision for optimizing urban traffic flow."
        },
        {
            title: "Blockchain in Supply Chain",
            type: "Research Paper",
            pages: 45,
            format: "PDF",
            description: "Analysis of decentralized ledgers for transparency in logistics."
        },
        {
            title: "IoT Based Smart Home Security",
            type: "Project Report",
            pages: 85,
            format: "DOCX",
            description: "Technical documentation of a sensor-based home automation prototype."
        }
    ];

    const media = [
        { type: "Video", title: "App Demo Reel", duration: "2:30", color: "bg-red-500/20" },
        { type: "Screenshot", title: "Admin Dashboard UI", count: "5 Screens", color: "bg-blue-500/20" },
        { type: "Video", title: "System Architecture Walkthrough", duration: "5:15", color: "bg-green-500/20" },
        { type: "Screenshot", title: "Mobile App Flows", count: "12 Screens", color: "bg-yellow-500/20" },
    ];

    return (
        <div className="min-h-screen py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Our <span className="text-gradient">Portfolio</span>
                </h1>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12 text-lg">
                    Explore our completed projects, academic research, and visual showcases.
                </p>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="flex gap-2 p-1 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                        {[
                            { id: "projects", label: "Projects" },
                            { id: "thesis", label: "Thesis & Reports" },
                            { id: "media", label: "Videos & Media" }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabId)}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-bold transition-all",
                                    activeTab === tab.id
                                        ? "bg-purple-600 text-white shadow-lg"
                                        : "text-gray-400 hover:text-white hover:bg-white/10"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Grid */}
                {activeTab === "projects" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in-up">
                        {projects.map((project, index) => (
                            <div key={index} className="group relative rounded-3xl overflow-hidden glass-card border-none">
                                <div className={`h-64 w-full bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity`}>
                                    <div className="flex items-center justify-center h-full text-white/50 font-bold text-4xl uppercase tracking-widest mix-blend-overlay">
                                        {project.category}
                                    </div>
                                </div>

                                <div className="p-8 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                                            <p className="text-sm text-purple-400 font-medium">{project.category}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                                                <Github className="w-5 h-5 text-gray-300" />
                                            </button>
                                            <button className="p-2 rounded-full bg-white/5 hover:bg-white/20 transition-colors">
                                                <ExternalLink className="w-5 h-5 text-gray-300" />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="text-gray-400">{project.description}</p>

                                    <div className="flex gap-2 flex-wrap">
                                        {project.tech.map((t) => (
                                            <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Thesis Grid */}
                {activeTab === "thesis" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up">
                        {theses.map((thesis, i) => (
                            <div key={i} className="glass-card p-8 hover:bg-white/10 transition-colors group">
                                <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center mb-6 text-yellow-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{thesis.title}</h3>
                                </div>
                                <div className="flex gap-3 text-xs font-semibold text-gray-500 mb-4">
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{thesis.type}</span>
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{thesis.format}</span>
                                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{thesis.pages} Pages</span>
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {thesis.description}
                                </p>
                                <button className="w-full py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-2 text-sm font-bold transition-all">
                                    <Download className="w-4 h-4" /> Download Sample
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Media Grid */}
                {activeTab === "media" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
                        {media.map((item, i) => (
                            <div key={i} className="glass-card overflow-hidden group hover:scale-[1.02] transition-transform">
                                <div className={`h-48 w-full ${item.color} flex items-center justify-center relative`}>
                                    {item.type === 'Video' ? (
                                        <PlayCircle className="w-12 h-12 text-white opacity-80 group-hover:scale-110 transition-transform" />
                                    ) : (
                                        <FileJson className="w-12 h-12 text-white opacity-50" />
                                    )}
                                    <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/60 rounded text-xs font-bold text-white backdrop-blur-sm">
                                        {item.type === 'Video' ? item.duration : item.count}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">{item.type}</p>
                                    <h3 className="font-bold text-white">{item.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}
