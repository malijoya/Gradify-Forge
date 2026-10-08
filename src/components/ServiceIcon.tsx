import { BrainCircuit, CodeXml, Cpu, PenTool, Rocket, TabletSmartphone } from "lucide-react";
import { clsx } from "clsx";

// Each service gets its own icon and colour. Class names are written out in full so Tailwind picks them up.
const icons = {
    CodeXml: { Icon: CodeXml, tile: "from-sky-500/25 to-blue-600/5 ring-sky-400/30 text-sky-300", glow: "bg-sky-500" },
    TabletSmartphone: { Icon: TabletSmartphone, tile: "from-violet-500/25 to-purple-600/5 ring-violet-400/30 text-violet-300", glow: "bg-violet-500" },
    BrainCircuit: { Icon: BrainCircuit, tile: "from-fuchsia-500/25 to-pink-600/5 ring-fuchsia-400/30 text-fuchsia-300", glow: "bg-fuchsia-500" },
    Cpu: { Icon: Cpu, tile: "from-emerald-500/25 to-teal-600/5 ring-emerald-400/30 text-emerald-300", glow: "bg-emerald-500" },
    PenTool: { Icon: PenTool, tile: "from-amber-500/25 to-orange-600/5 ring-amber-400/30 text-amber-300", glow: "bg-amber-500" },
    Rocket: { Icon: Rocket, tile: "from-rose-500/25 to-red-600/5 ring-rose-400/30 text-rose-300", glow: "bg-rose-500" },
};

/** Gradient icon tile for a service card. Put it inside an element with the `group` class for the hover glow. */
export default function ServiceIcon({ name, className }: { name: keyof typeof icons; className?: string }) {
    const { Icon, tile, glow } = icons[name];
    return (
        <div className={clsx("relative w-14 h-14", className)}>
            <div className={clsx("absolute inset-1 rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-opacity", glow)} />
            <div
                className={clsx(
                    "relative w-full h-full rounded-2xl bg-gradient-to-br ring-1 ring-inset backdrop-blur-sm flex items-center justify-center",
                    "transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105",
                    tile
                )}
            >
                <Icon className="w-6 h-6" strokeWidth={1.75} />
            </div>
        </div>
    );
}
