import { Globe, Smartphone, Brain, Wifi, FileText, Lightbulb } from "lucide-react";

export default function Services() {
    const services = [
        {
            title: "App Development",
            icon: Smartphone,
            description: "Native and cross-platform mobile apps for iOS and Android. Built with Flutter or React Native.",
            price: "From $2,500"
        },
        {
            title: "Web Development",
            icon: Globe,
            description: "Full-stack web applications using Next.js, React, and Node.js. Responsive and high-performance.",
            price: "From $1,500"
        },
        {
            title: "AI Projects",
            icon: Brain,
            description: "Machine Learning and Artificial Intelligence models. Computer Vision, NLP, and Predictive Analytics.",
            price: "From $1,000"
        },
        {
            title: "IoT Projects",
            icon: Wifi,
            description: "Internet of Things solutions connecting hardware sensors to cloud dashboards. Arduino, ESP32, and Raspberry Pi.",
            price: "From $800"
        },
        {
            title: "Thesis & Report Writing",
            icon: FileText,
            description: "Professional technical writing for final year project reports, thesis papers, and documentation.",
            price: "From $200"
        },
        {
            title: "Project Ideas Store",
            icon: Lightbulb,
            description: "Browse our catalog of innovative project ideas. Get inspired or buy a complete project blueprint.",
            price: "From $50"
        }
    ];

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
                    {services.map((service, index) => (
                        <div key={index} className="glass-card p-8 group hover:bg-white/10 transition-colors">
                            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
                                <service.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-white">{service.title}</h3>
                            <p className="text-gray-400 mb-6">{service.description}</p>
                            <div className="text-sm font-semibold text-purple-400">{service.price}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
