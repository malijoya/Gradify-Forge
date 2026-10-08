import Link from "next/link";
import { ArrowRight, CheckCircle, Zap, MessageSquare, PenTool, Code2, Rocket } from "lucide-react";
import { listProjects } from "@/lib/db";
import { services, site } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import ServiceIcon from "@/components/ServiceIcon";


const steps = [
  { icon: MessageSquare, title: "Discover", text: "We learn your goals, users and constraints in a free consultation." },
  { icon: PenTool, title: "Design", text: "Wireframes and UI designs you approve before a line of code is written." },
  { icon: Code2, title: "Build", text: "Weekly demos and transparent progress, so you always know where things stand." },
  { icon: Rocket, title: "Launch", text: "Deployment, handover and ongoing support after go-live." },
];

export default async function Home() {
  const projects = await listProjects({ publishedOnly: true });
  const showcase = projects.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex-1 flex items-center justify-center py-20 px-8 overflow-hidden min-h-[85vh]">
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            We Turn Ideas Into <br />
            <span className="text-gradient">Products People Love</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">{site.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href="/contact"
              className="px-8 py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-gray-200 transition-all flex items-center gap-2 transform hover:scale-105"
            >
              Get a Free Consultation <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-4 rounded-full border border-white/20 hover:bg-white/10 transition-all font-medium text-lg"
            >
              See Our Work
            </Link>
          </div>

          <div className="pt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-gray-500 text-sm">
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Free project estimate</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Weekly progress demos</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Support after launch</div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      {showcase.length > 0 && (
        <section className="py-24 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-3">Recent Work</h2>
                <p className="text-gray-400">A selection of products we&apos;ve designed and built.</p>
              </div>
              <Link href="/portfolio" className="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-2">
                View all projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {showcase.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What We Do</h2>
            <p className="text-gray-400">End-to-end product development under one roof.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <div key={s.title} className="glass-card p-8 group hover:bg-white/10 transition-colors">
                <ServiceIcon name={s.icon} className="mb-5" />
                <h3 className="text-xl font-bold mb-2 text-white">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">How We Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="glass-card p-6 relative">
                <div className="text-5xl font-bold text-white/5 absolute top-4 right-5">0{i + 1}</div>
                <step.icon className="w-8 h-8 text-pink-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/20 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10 glass-card p-12 border-purple-500/30">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Tell us what you&apos;re building and get a free estimate within 24 hours.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xl hover:opacity-90 transition-opacity"
          >
            Let&apos;s Talk <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
