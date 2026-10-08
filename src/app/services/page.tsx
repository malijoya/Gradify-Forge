import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/site";
import ServiceIcon from "@/components/ServiceIcon";

export const metadata: Metadata = { title: "Services" };

export default function Services() {
    return (
        <div className="min-h-screen py-20 px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
                    Our <span className="text-gradient">Services</span>
                </h1>
                <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16 text-lg">
                    Comprehensive digital solutions tailored to your business needs.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service) => (
                        <div key={service.title} className="glass-card p-8 group hover:bg-white/10 transition-colors flex flex-col">
                            <ServiceIcon name={service.icon} className="mb-6" />
                            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                            <p className="text-gray-400 mb-6 flex-1">{service.description}</p>
                            <Link href="/contact" className="text-sm font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1">
                                Get a quote <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
