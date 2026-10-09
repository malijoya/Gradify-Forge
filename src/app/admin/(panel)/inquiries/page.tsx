import Link from "next/link";
import { Building2, Inbox, Mail, MailOpen, Reply, Trash2 } from "lucide-react";
import { clsx } from "clsx";
import { requireInboxAdmin } from "@/lib/auth";
import { inquiryStorage, listInquiries } from "@/lib/db";
import { initials, timeAgo } from "@/lib/format";
import { markInquiry, removeInquiry } from "../../actions";
import ActionButton from "../../_components/ActionButton";
import PageHeader from "../../_components/PageHeader";
import ConfirmButton from "../ConfirmButton";

export default async function Inquiries({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
    await requireInboxAdmin();
    const [all, { filter }] = await Promise.all([listInquiries(), searchParams]);
    const unreadOnly = filter === "unread";
    const unread = all.filter((i) => !i.read).length;
    const inquiries = unreadOnly ? all.filter((i) => !i.read) : all;

    const tab = (active: boolean) =>
        clsx("px-3 h-8 rounded-lg text-sm font-medium flex items-center gap-1.5 transition-colors", active ? "bg-white/[0.1] text-white" : "text-gray-400 hover:text-white");

    return (
        <div className="animate-fade-in-up">
            <PageHeader title="Inquiries" subtitle="Messages from potential clients sent through your contact form." />

            {!inquiryStorage() && (
                <div className="mb-6 rounded-xl border border-amber-400/20 bg-amber-500/[0.07] p-4 text-sm text-amber-200 leading-relaxed">
                    Messages are only being emailed right now, so this inbox stays empty. To keep a copy here, add an Upstash Redis
                    database in Vercel (Storage &gt; Create Database &gt; Upstash for Redis), connect it to this project and redeploy.
                </div>
            )}

            <div className="flex gap-1 p-1 rounded-xl bg-black/30 border border-white/[0.07] w-fit mb-6">
                <Link href="/admin/inquiries" className={tab(!unreadOnly)}>
                    All <span className="text-xs text-gray-500">{all.length}</span>
                </Link>
                <Link href="/admin/inquiries?filter=unread" className={tab(unreadOnly)}>
                    Unread <span className="text-xs text-gray-500">{unread}</span>
                </Link>
            </div>

            {inquiries.length === 0 ? (
                <div className="glass-card p-16 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/[0.04] grid place-items-center mx-auto mb-4">
                        <Inbox className="w-6 h-6 text-gray-500" />
                    </div>
                    <p className="font-medium mb-1">{unreadOnly ? "You're all caught up" : "No inquiries yet"}</p>
                    <p className="text-sm text-gray-500">
                        {unreadOnly ? "Every message has been read." : "When a client sends a message from your Contact page, it will appear here."}
                    </p>
                </div>
            ) : (
                <div className="space-y-3">
                    {inquiries.map((q) => (
                        <article
                            key={q.id}
                            className={clsx("glass-card relative overflow-hidden p-5 sm:p-6", !q.read && "bg-purple-500/[0.04] border-purple-400/20")}
                        >
                            {!q.read && <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-violet-400 to-pink-500" />}

                            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500/50 to-pink-500/40 ring-1 ring-inset ring-white/10 grid place-items-center text-sm font-bold shrink-0">
                                    {initials(q.name)}
                                </div>

                                <div className="flex-1 min-w-0 space-y-3">
                                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                <h2 className={clsx(q.read ? "font-medium" : "font-semibold")}>{q.name}</h2>
                                                {!q.read && <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-600">New</span>}
                                                {q.company && (
                                                    <span className="flex items-center gap-1 text-sm text-gray-400">
                                                        <Building2 className="w-3.5 h-3.5" /> {q.company}
                                                    </span>
                                                )}
                                            </div>
                                            <a href={`mailto:${q.email}`} className="text-sm text-purple-300 hover:text-purple-200">{q.email}</a>
                                        </div>
                                        <time className="text-xs text-gray-500" dateTime={q.createdAt} title={new Date(q.createdAt).toLocaleString()}>
                                            {timeAgo(q.createdAt)}
                                        </time>
                                    </div>

                                    {(q.service || q.budget) && (
                                        <div className="flex flex-wrap gap-2">
                                            {q.service && <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-300 ring-1 ring-inset ring-sky-400/20">{q.service}</span>}
                                            {q.budget && <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 ring-1 ring-inset ring-emerald-400/20">{q.budget}</span>}
                                        </div>
                                    )}

                                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap rounded-xl bg-black/20 border border-white/[0.05] p-4">{q.message}</p>

                                    <div className="flex items-center gap-2">
                                        <a
                                            href={`mailto:${q.email}?subject=${encodeURIComponent("Re: your project inquiry")}`}
                                            className="flex items-center gap-2 h-9 px-4 rounded-lg bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
                                        >
                                            <Reply className="w-4 h-4" /> Reply
                                        </a>
                                        <form action={markInquiry}>
                                            <input type="hidden" name="id" value={q.id} />
                                            <input type="hidden" name="read" value={String(!q.read)} />
                                            <ActionButton className="flex items-center gap-2 h-9 px-3 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                                                {q.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                                                {q.read ? "Mark unread" : "Mark read"}
                                            </ActionButton>
                                        </form>
                                        <form action={removeInquiry} className="ml-auto">
                                            <input type="hidden" name="id" value={q.id} />
                                            <ConfirmButton
                                                title="Delete this inquiry?"
                                                message={`The message from ${q.name} will be permanently deleted.`}
                                                className="grid place-items-center w-9 h-9 rounded-lg text-gray-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                                                aria-label="Delete inquiry"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </ConfirmButton>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}
