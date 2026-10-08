import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroMotion from "./HeroMotion";
import LightRibbons from "./LightRibbons";
import Typewriter from "./Typewriter";
import WorkflowPanel from "./WorkflowPanel";

/** Small "+" / "×" registration marks scattered over the hero background. */
function Mark({ className, cross }: { className: string; cross?: boolean }) {
    return (
        <span className={`absolute w-3 h-3 text-white/25 ${className}`}>
            <span className={`absolute inset-0 ${cross ? "rotate-45" : ""}`}>
                <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current" />
                <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-current" />
            </span>
        </span>
    );
}

export default function Hero({ projectCount }: { projectCount: number }) {
    return (
        <section id="hero" aria-labelledby="hero-title" className="relative -mt-20 pt-20 overflow-hidden">
            <HeroMotion sectionId="hero" panelId="hero-panel" />

            {/* Backdrop: deepen the page background behind the hero and fade back into it below */}
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#06060c]/85 [mask-image:linear-gradient(to_bottom,#000_75%,transparent)]" />
            <div aria-hidden className="hero-dots pointer-events-none absolute inset-0" />
            <div
                aria-hidden
                className="pointer-events-none absolute left-[47%] top-[58%] w-[44rem] h-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(139,92,246,0.3)_0%,rgba(192,38,211,0.09)_45%,transparent_70%)]"
            />
            <div aria-hidden className="pointer-events-none hidden lg:block">
                <Mark className="left-[61%] top-[85%]" />
                <Mark className="left-[89%] top-[84%]" />
                <Mark className="left-[49.5%] top-[96%]" cross />
            </div>

            <LightRibbons />

            <div className="relative mx-auto max-w-[1188px] px-6 min-h-[calc(100svh-5rem)] lg:min-h-[max(calc(100svh-5rem),760px)] flex flex-col justify-center pt-16 pb-20 lg:py-0">
                <div className="relative z-10 max-w-[520px]">
                    <p className="hero-blur-in inline-flex items-center gap-2.5 h-8 px-3 rounded-md border border-violet-400/35 bg-violet-500/[0.04] font-mono text-[12px] sm:text-[13px] text-gray-200">
                        <span aria-hidden className="w-1.5 h-1.5 bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />
                        <Typewriter text="software studio / web · mobile · ai · iot" delay={500} />
                    </p>

                    <h1
                        id="hero-title"
                        className="mt-10 text-[2.75rem] sm:text-[3.5rem] lg:text-[clamp(3.25rem,5vw,4rem)] leading-[1.04] font-semibold tracking-[-0.035em] text-white"
                    >
                        <span className="hero-blur-in block" style={{ animationDelay: "0.15s" }}>
                            We turn ideas into
                        </span>
                        <span className="hero-blur-in block" style={{ animationDelay: "0.3s" }}>
                            <span className="font-serif italic font-normal tracking-[-0.01em] text-white/85 pr-0.5">real products</span>
                            <span>.</span>
                        </span>
                    </h1>

                    <p className="hero-blur-in mt-8 max-w-[430px] text-[16px] sm:text-[17px] leading-[1.55] text-gray-400" style={{ animationDelay: "0.45s" }}>
                        We design and build web, mobile, AI and IoT software, and show you real progress every week.
                    </p>

                    <div className="hero-blur-in mt-8 flex flex-wrap items-center gap-2.5" style={{ animationDelay: "0.6s" }}>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 h-11 px-5 rounded-full bg-white text-black text-[15px] font-medium shadow-[0_0_30px_-8px_rgba(255,255,255,0.55)] hover:bg-gray-200 transition-colors"
                        >
                            Get a free consultation
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                        <Link
                            href="/portfolio"
                            className="group inline-flex items-center gap-2.5 h-11 px-5 rounded-full border border-white/15 bg-white/[0.04] text-[15px] text-white hover:bg-white/[0.09] hover:border-white/25 transition-colors"
                        >
                            <svg aria-hidden viewBox="0 0 10 10" className="w-2.5 h-2.5 fill-white transition-transform group-hover:translate-x-0.5">
                                <path d="M1 0.5v9l8-4.5z" />
                            </svg>
                            {projectCount > 0 ? `See our work, ${projectCount} project${projectCount === 1 ? "" : "s"}` : "See our work"}
                        </Link>
                    </div>

                    <p className="mt-6 font-mono text-[12px] sm:text-[13px] text-gray-500">
                        <Typewriter text="free estimate / weekly demos / support after launch" delay={1400} speed={30} />
                    </p>
                </div>

                {/* Workflow panel: absolute and bleeding off the right edge on desktop, below the copy on smaller screens */}
                <div className="relative z-[5] mt-14 h-[calc(555px*0.55)] sm:h-[calc(555px*0.8)] lg:mt-0 lg:h-auto lg:absolute lg:left-[calc(50%+70px)] xl:left-[calc(50%+40px)] lg:top-[calc(50%-278px)]">
                    <div className="hero-panel-in" style={{ animationDelay: "0.6s" }}>
                        <div className="origin-top-left scale-[0.55] sm:scale-[0.8] lg:scale-[0.84] xl:scale-100 ml-[53px] sm:ml-[78px] lg:ml-0">
                            <div className="hero-lift">
                                <div id="hero-panel" className="hero-tilt">
                                    <WorkflowPanel />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
