import { listProjects } from "@/lib/db";
import { services } from "@/lib/site";
import ProjectCard from "@/components/ProjectCard";
import Hero from "@/components/hero/Hero";
import CraftRows from "@/components/home/CraftRows";
import FinalCta from "@/components/home/FinalCta";
import Numbers from "@/components/home/Numbers";
import PageStrands from "@/components/home/PageStrands";
import ProcessBento from "@/components/home/ProcessBento";
import QuoteBand from "@/components/home/QuoteBand";
import SectionHeading from "@/components/home/SectionHeading";
import ServicesGrid from "@/components/home/ServicesGrid";
import ToolStrip from "@/components/home/ToolStrip";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function Home() {
  const projects = await listProjects({ publishedOnly: true });
  const showcase = projects.slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero projectCount={projects.length} />

      <div className="relative isolate">
        <PageStrands />

        <ToolStrip />
        <CraftRows />
        <QuoteBand />
        <ServicesGrid />

        {/* Featured Work */}
        {showcase.length > 0 && (
          <section aria-labelledby="work-title" className="relative mx-auto w-full max-w-[1188px] px-6 py-24">
            <SectionHeading
              id="work-title"
              kicker="recent work"
              title={
                <>
                  Work that <em>shipped.</em>
                </>
              }
              aside="A selection of products we've designed and built. Every one is live, so go ahead and click through."
            />
            <div className="home-stagger mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showcase.map((p) => (
                <div key={p.id} className="flex [&>*]:w-full">
                  <ProjectCard project={p} />
                </div>
              ))}
            </div>
            <Link
              href="/portfolio"
              className="home-reveal group mt-8 inline-flex items-center gap-1.5 font-mono text-[13px] text-gray-400 hover:text-white transition-colors"
            >
              view all projects <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </section>
        )}

        <ProcessBento />
        <Numbers projectCount={projects.length} serviceCount={services.length} />
        <FinalCta />
      </div>
    </div>
  );
}
