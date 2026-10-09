import Link from "next/link";
import { ArrowRight, Eye, ImageOff, Inbox, Layers, Mail, Star } from "lucide-react";
import { clsx } from "clsx";
import { redirect } from "next/navigation";
import { adminMode, requireAdmin } from "@/lib/auth";
import { listInquiries, listProjects } from "@/lib/db";
import { hostname, initials, timeAgo } from "@/lib/format";
import PageHeader from "../_components/PageHeader";
import QuickAdd from "../_components/QuickAdd";

export default async function Dashboard() {
    if (adminMode() === "inbox") redirect("/admin/inquiries");
    await requireAdmin();
    const [projects, inquiries] = await Promise.all([listProjects(), listInquiries()]);
    const unread = inquiries.filter((i) => !i.read).length;
    const recentProjects = [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)).slice(0, 5);

    const stats = [
        { label: "Total projects", value: projects.length, icon: Layers, tone: "text-violet-300 from-violet-500/20 ring-violet-400/20", href: "/admin/projects" },
        { label: "Live on website", value: projects.filter((p) => p.published).length, icon: Eye, tone: "text-emerald-300 from-emerald-500/20 ring-emerald-400/20", href: "/admin/projects?filter=live" },
        { label: "Featured", value: projects.filter((p) => p.featured).length, icon: Star, tone: "text-amber-300 from-amber-500/20 ring-amber-400/20", href: "/admin/projects?filter=featured" },
        { label: "Unread inquiries", value: unread, icon: Inbox, tone: "text-pink-300 from-pink-500/20 ring-pink-400/20", href: "/admin/inquiries?filter=unread" },
    ];

    return (
        <div className="space-y-8 animate-fade-in-up">
            <PageHeader title="Dashboard" subtitle="Here's what's happening with your portfolio." />

            <QuickAdd />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s) => (
                    <Link key={s.label} href={s.href} className="glass-card p-5 group hover:bg-white/[0.07] transition-colors">
                        <div className={clsx("w-10 h-10 rounded-xl grid place-items-center bg-gradient-to-br to-transparent ring-1 ring-inset mb-4", s.tone)}>
                            <s.icon className="w-5 h-5" />
                        </div>
                        <div className="text-3xl font-bold tracking-tight">{s.value}</div>
                        <div className="text-sm text-gray-400 mt-0.5 flex items-center justify-between">
                            {s.label}
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <section className="glass-card p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-semibold">Recent projects</h2>
                        <Link href="/admin/projects" className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {recentProjects.length === 0 ? (
                        <p className="text-sm text-gray-500 py-8 text-center">No projects yet. Paste a link above to add your first one.</p>
                    ) : (
                        <ul className="space-y-1">
                            {recentProjects.map((p) => (
                                <li key={p.id}>
                                    <Link href={`/admin/projects/${p.id}`} className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                                        <div className="w-16 aspect-[16/10] rounded-lg overflow-hidden bg-white/5 shrink-0 grid place-items-center">
                                            {p.thumbnail ? (
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img src={`/uploads/${p.thumbnail}`} alt="" className="w-full h-full object-cover object-top" />
                                            ) : (
                                                <ImageOff className="w-4 h-4 text-gray-600" />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-sm font-medium truncate flex items-center gap-1.5">
                                                {p.title}
                                                {p.featured && <Star className="w-3.5 h-3.5 text-amber-300 fill-current shrink-0" />}
                                            </div>
                                            <div className="text-xs text-gray-500 truncate">{hostname(p.url)} · updated {timeAgo(p.updatedAt)}</div>
                                        </div>
                                        <span
                                            className={clsx(
                                                "text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0",
                                                p.published ? "bg-emerald-500/10 text-emerald-300" : "bg-white/[0.06] text-gray-400"
                                            )}
                                        >
                                            {p.published ? "Live" : "Hidden"}
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section className="glass-card p-6">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="font-semibold flex items-center gap-2">
                            Latest inquiries
                            {unread > 0 && <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-600">{unread} new</span>}
                        </h2>
                        <Link href="/admin/inquiries" className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                            View all <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>
                    {inquiries.length === 0 ? (
                        <div className="py-8 text-center">
                            <Mail className="w-8 h-8 text-gray-700 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">No inquiries yet. Messages from your contact form will show up here.</p>
                        </div>
                    ) : (
                        <ul className="space-y-1">
                            {inquiries.slice(0, 5).map((q) => (
                                <li key={q.id}>
                                    <Link href="/admin/inquiries" className="flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-white/[0.04] transition-colors">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500/40 to-pink-500/30 grid place-items-center text-xs font-bold shrink-0">
                                            {initials(q.name)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className={clsx("text-sm truncate", q.read ? "text-gray-300" : "font-semibold text-white")}>{q.name}</span>
                                                {!q.read && <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0" />}
                                                <span className="ml-auto text-xs text-gray-500 shrink-0">{timeAgo(q.createdAt)}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 truncate">{q.message}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    );
}
