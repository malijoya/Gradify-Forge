"use client";

import { Activity, DollarSign, TrendingUp, MessageSquare, FileText, Upload, Clock, Download, Send, User } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

type TabId = "overview" | "chat" | "files" | "payments";

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<TabId>("overview");
    const [message, setMessage] = useState("");

    // Mock Chat Data
    const [chatHistory, setChatHistory] = useState([
        { sender: "dev", text: "Hello! I've started working on the backend API.", time: "10:00 AM" },
        { sender: "me", text: "Great! When can I expect the first demo?", time: "10:05 AM" },
        { sender: "dev", text: "I should have the login module ready by Friday.", time: "10:10 AM" },
    ]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;
        setChatHistory([...chatHistory, { sender: "me", text: message, time: "Now" }]);
        setMessage("");
        // Simulate reply
        setTimeout(() => {
            setChatHistory(prev => [...prev, { sender: "dev", text: "Thanks for the update. I'll check that right away.", time: "Now" }]);
        }, 2000);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 pt-24 pb-20">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 animate-fade-in-up">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Dashboard</h1>
                        <p className="text-gray-400">Welcome back, <span className="text-white font-bold">Alex</span></p>
                    </div>
                    <div className="flex gap-4">
                        <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-bold flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Active Project: E-Commerce App
                        </span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                    {[
                        { id: "overview", label: "Overview", icon: Activity },
                        { id: "chat", label: "Developer Chat", icon: MessageSquare },
                        { id: "files", label: "Documents", icon: FileText },
                        { id: "payments", label: "Payment History", icon: DollarSign },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as TabId)}
                            className={clsx(
                                "px-6 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 whitespace-nowrap",
                                activeTab === tab.id
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                                    : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                            )}
                        >
                            <tab.icon className="w-4 h-4" /> {tab.label}
                        </button>
                    ))}
                </div>

                {/* OVERVIEW CONTENT */}
                {activeTab === "overview" && (
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: "Total Budget", value: "$4,520", icon: DollarSign, color: "text-green-400 bg-green-500/10" },
                                { label: "Hours Logged", value: "124 hrs", icon: Clock, color: "text-blue-400 bg-blue-500/10" },
                                { label: "Pending Milestones", value: "2", icon: Activity, color: "text-purple-400 bg-purple-500/10" },
                                { label: "Project Health", value: "98%", icon: TrendingUp, color: "text-pink-400 bg-pink-500/10" },
                            ].map((stat, i) => (
                                <div key={i} className="glass-card p-6 flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${stat.color}`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">{stat.label}</p>
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Detailed Timeline */}
                            <div className="glass-card p-6 lg:col-span-2">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Activity className="w-5 h-5 text-purple-400" /> Project Timeline
                                </h3>
                                <div className="space-y-8 relative pl-4 border-l border-white/10 ml-2">
                                    {[
                                        { title: "Requirements Gathering", date: "Sep 15", status: "Completed", completed: true },
                                        { title: "UI/UX Design Phase", date: "Oct 01", status: "Completed", completed: true },
                                        { title: "Frontend Implementation", date: "Oct 20", status: "Completed", completed: true },
                                        { title: "Backend API Integration", date: "Nov 05", status: "In Progress", completed: false, current: true },
                                        { title: "Testing & QA", date: "Nov 25", status: "Pending", completed: false },
                                        { title: "Final Delivery", date: "Dec 01", status: "Pending", completed: false },
                                    ].map((item, i) => (
                                        <div key={i} className="relative pl-8 group">
                                            <div className={clsx(
                                                "absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-black transition-colors",
                                                item.completed ? 'bg-purple-500' : item.current ? 'bg-blue-500 animate-pulse' : 'bg-gray-700'
                                            )} />
                                            <h4 className={clsx("text-lg font-bold transition-colors", item.completed || item.current ? 'text-white' : 'text-gray-500')}>
                                                {item.title}
                                            </h4>
                                            <p className="text-sm text-gray-500">{item.date} — {item.status}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="glass-card p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                                <h3 className="text-xl font-bold mb-4">Next Milestone</h3>
                                <div className="mb-6">
                                    <div className="text-4xl font-bold text-white mb-1">5 <span className="text-lg font-normal text-gray-400">Days</span></div>
                                    <p className="text-gray-400 text-sm">remaining until Backend Completion</p>
                                </div>
                                <div className="w-full bg-black/40 h-2 rounded-full mb-2 overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 w-[75%]" />
                                </div>
                                <div className="flex justify-between text-xs text-gray-400 font-bold uppercase tracking-wider">
                                    <span>Progress</span>
                                    <span>75%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CHAT CONTENT */}
                {activeTab === "chat" && (
                    <div className="glass-card h-[600px] flex flex-col overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center font-bold text-white">MK</div>
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white">Mike (Lead Dev)</h3>
                                <p className="text-xs text-green-400 font-mono">Online now</p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-black/20">
                            {chatHistory.map((msg, i) => (
                                <div key={i} className={clsx("flex gap-3", msg.sender === "me" ? "flex-row-reverse" : "")}>
                                    <div className={clsx(
                                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0",
                                        msg.sender === "me" ? "bg-white/10" : "bg-purple-500"
                                    )}>
                                        {msg.sender === "me" ? <User className="w-4 h-4" /> : "MK"}
                                    </div>
                                    <div className={clsx(
                                        "p-3 rounded-2xl max-w-[80%] text-sm",
                                        msg.sender === "me" ? "bg-purple-600 text-white rounded-tr-none" : "bg-white/5 text-gray-300 rounded-tl-none"
                                    )}>
                                        <p>{msg.text}</p>
                                        <p className="text-[10px] opacity-50 mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-purple-500 text-white placeholder:text-gray-500"
                            />
                            <button type="submit" className="p-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                )}

                {/* FILES CONTENT */}
                {activeTab === "files" && (
                    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">Project Documents</h3>
                            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-bold flex items-center gap-2 transition-colors border border-white/5">
                                <Upload className="w-4 h-4" /> Upload New File
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {[
                                { name: "Project_Requirements_v2.pdf", size: "2.4 MB", date: "Sep 15", type: "PDF" },
                                { name: "UI_Wireframes_Final.fig", size: "15 MB", date: "Oct 01", type: "FIG" },
                                { name: "Backend_API_Docs.json", size: "45 KB", date: "Nov 12", type: "JSON" },
                                { name: "Contract_Signed.pdf", size: "1.1 MB", date: "Sep 10", type: "PDF" },
                            ].map((file, i) => (
                                <div key={i} className="glass-card p-4 flex items-center justify-between group hover:bg-white/5 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-sm truncate max-w-[150px]">{file.name}</h4>
                                            <p className="text-xs text-gray-500">{file.date} • {file.size}</p>
                                        </div>
                                    </div>
                                    <button className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <Download className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* PAYMENTS CONTENT */}
                {activeTab === "payments" && (
                    <div className="glass-card overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                        <div className="p-6 border-b border-white/10">
                            <h3 className="text-xl font-bold text-white">Transaction History</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-white/5 text-xs uppercase text-gray-400">
                                    <tr>
                                        <th className="px-6 py-4 font-bold">Invoice ID</th>
                                        <th className="px-6 py-4 font-bold">Date</th>
                                        <th className="px-6 py-4 font-bold">Description</th>
                                        <th className="px-6 py-4 font-bold">Amount</th>
                                        <th className="px-6 py-4 font-bold">Status</th>
                                        <th className="px-6 py-4 font-bold"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {[
                                        { id: "#INV-2024-001", date: "Sep 10, 2024", desc: "Initial Deposit (50%)", amount: "$2,260.00", status: "Paid" },
                                        { id: "#INV-2024-002", date: "Oct 15, 2024", desc: "UI/UX Design Phase", amount: "$1,000.00", status: "Paid" },
                                        { id: "#INV-2024-003", date: "Nov 20, 2024", desc: "Backend Server Setup", amount: "$1,260.00", status: "Pending" },
                                    ].map((row, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-4 font-mono text-sm text-gray-300">{row.id}</td>
                                            <td className="px-6 py-4 text-sm text-gray-300">{row.date}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-white">{row.desc}</td>
                                            <td className="px-6 py-4 text-sm text-white font-bold">{row.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={clsx(
                                                    "px-2 py-1 rounded text-xs font-bold border",
                                                    row.status === "Paid"
                                                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                )}>
                                                    {row.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
