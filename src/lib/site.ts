/**
 * Company details shown across the public site. Edit these to make the site yours.
 */
export const site = {
    name: "GradifyForge",
    tagline: "We design and build software that grows your business.",
    description:
        "GradifyForge is a software studio building web apps, mobile apps, AI solutions and IoT systems for startups, businesses and innovators.",
    email: "hello@gradifyforge.com",
    // Full international number without "+" or spaces, used for the WhatsApp button. Leave empty to hide it.
    whatsapp: "",
    location: "Remote · Worldwide",
    socials: {
        github: "",
        linkedin: "",
        x: "",
        instagram: "",
    },
};

/** Categories offered in the admin form and used for filtering on the portfolio page. */
export const projectCategories = [
    "Web App",
    "Mobile App",
    "AI / ML",
    "IoT",
    "E-Commerce",
    "SaaS",
    "UI/UX Design",
    "Other",
];

export const services = [
    {
        icon: "CodeXml",
        title: "Web Development",
        description: "Fast, scalable web apps and websites built with Next.js, React and Node.js.",
    },
    {
        icon: "TabletSmartphone",
        title: "Mobile Apps",
        description: "Cross-platform iOS and Android apps with Flutter or React Native.",
    },
    {
        icon: "BrainCircuit",
        title: "AI & Machine Learning",
        description: "Chatbots, computer vision, NLP and predictive models integrated into your product.",
    },
    {
        icon: "Cpu",
        title: "IoT Solutions",
        description: "Hardware sensors connected to cloud dashboards with ESP32, Arduino and Raspberry Pi.",
    },
    {
        icon: "PenTool",
        title: "UI/UX Design",
        description: "User research, wireframes and polished interfaces designed in Figma.",
    },
    {
        icon: "Rocket",
        title: "MVP & Product Launch",
        description: "From idea to launched product, including hosting, analytics and ongoing support.",
    },
] as const;

export const budgets = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000+", "Not sure yet"];
