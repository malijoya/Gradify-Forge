import { Check } from "lucide-react";
import { clsx } from "clsx";
import SectionHeading from "./SectionHeading";
import { delay } from "./anim";

function CallSlots() {
    const days = ["mon", "tue", "wed", "thu", "fri"];
    return (
        <div className="grid grid-cols-5 gap-2 font-mono text-[11px]">
            {days.map((d, i) => (
                <div key={d} className="flex flex-col gap-1.5">
                    <span className="text-gray-600">{d}</span>
                    {[0, 1, 2].map((slot) =>
                        i === 2 && slot === 1 ? (
                            <span key={slot} className="anim-pop h-7 rounded-md bg-gradient-to-r from-violet-400 to-fuchsia-400 px-2 flex items-center text-[#0b0b14] font-medium truncate" style={delay(300)}>
                                free call
                            </span>
                        ) : (
                            <span key={slot} className="h-7 rounded-md border border-white/[0.06] bg-white/[0.02]" />
                        )
                    )}
                </div>
            ))}
        </div>
    );
}

function ApprovedRing() {
    return (
        <div className="relative w-[104px] h-[104px] mx-auto">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="url(#ring-grad)" strokeWidth="6" strokeLinecap="round" pathLength={1} className="anim-draw" style={delay(150)} />
                <defs>
                    <linearGradient id="ring-grad" x1="0" x2="1" y1="0" y2="1">
                        <stop offset="0" stopColor="#a78bfa" />
                        <stop offset="1" stopColor="#f472b6" />
                    </linearGradient>
                </defs>
            </svg>
            <span className="absolute inset-0 grid place-items-center">
                <span className="anim-pop flex flex-col items-center gap-1" style={delay(900)}>
                    <Check className="w-5 h-5 text-violet-200" />
                    <span className="font-mono text-[11px] text-gray-400">approved</span>
                </span>
            </span>
        </div>
    );
}

function DemoBars() {
    const bars = [30, 45, 38, 60, 52, 72, 66, 84, 78, 100];
    return (
        <div className="h-[84px] flex items-end gap-1.5">
            {bars.map((h, i) => (
                <span
                    key={i}
                    className={clsx("anim-grow-y flex-1 rounded-sm", i === bars.length - 1 ? "bg-gradient-to-t from-violet-500 to-fuchsia-400" : "bg-white/[0.09]")}
                    style={delay(200 + i * 50, { height: `${h}%` })}
                />
            ))}
        </div>
    );
}

function LaunchLine() {
    return (
        <div className="relative font-mono text-[11px] text-gray-600">
            <svg viewBox="0 0 400 80" className="w-full h-[80px]" preserveAspectRatio="none" fill="none">
                <path d="M0 62 C 40 60, 70 58, 110 50 S 170 20, 210 24 S 290 30, 330 18 S 380 12, 400 10" stroke="url(#launch-grad)" strokeWidth="2" vectorEffect="non-scaling-stroke" pathLength={1} className="anim-draw" style={delay(250)} />
                <path d="M0 62 C 40 60, 70 58, 110 50 S 170 20, 210 24 S 290 30, 330 18 S 380 12, 400 10 L 400 80 L 0 80 Z" fill="url(#launch-fill)" className="anim-fade" style={delay(900)} />
                <line x1="210" x2="210" y1="0" y2="80" stroke="rgba(255,255,255,0.12)" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
                <defs>
                    <linearGradient id="launch-grad" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0" stopColor="#6d28d9" />
                        <stop offset="1" stopColor="#f472b6" />
                    </linearGradient>
                    <linearGradient id="launch-fill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0" stopColor="#a78bfa" stopOpacity="0.18" />
                        <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="mt-2 flex justify-between">
                <span>build</span>
                <span>go-live</span>
                <span>support</span>
            </div>
        </div>
    );
}

const steps = [
    { title: "Discover", text: "We learn your goals, users and constraints in a free consultation.", visual: <CallSlots />, span: "lg:col-span-2" },
    { title: "Design", text: "Wireframes and UI designs you approve before a line of code is written.", visual: <ApprovedRing />, span: "" },
    { title: "Build", text: "Weekly demos and transparent progress, so you always know where things stand.", visual: <DemoBars />, span: "" },
    { title: "Launch", text: "Deployment, handover and ongoing support after go-live.", visual: <LaunchLine />, span: "lg:col-span-2" },
];

export default function ProcessBento() {
    return (
        <section aria-labelledby="process-title" className="relative mx-auto max-w-[1188px] px-6 py-24">
            <SectionHeading
                id="process-title"
                kicker="how we work"
                title={
                    <>
                        A project, seen from <em>the inside.</em>
                    </>
                }
                aside="Four steps, the same for every client, so you always know which one we are in and what comes next."
            />
            <ol className="home-stagger mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {steps.map((s, i) => (
                    <li key={s.title} className={clsx("home-card rounded-[18px] p-6 flex flex-col gap-6", s.span)}>
                        <div className="flex-1 flex flex-col justify-center">{s.visual}</div>
                        <div>
                            <span className="font-mono text-[11px] text-gray-600">0{i + 1}</span>
                            <h3 className="mt-1.5 text-[16px] font-medium text-white">{s.title}</h3>
                            <p className="mt-1.5 text-[13px] leading-relaxed text-gray-400">{s.text}</p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
