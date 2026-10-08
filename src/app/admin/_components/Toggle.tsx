"use client";

type Props = {
    name: string;
    label: string;
    description?: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
};

/** Labelled switch backed by a real checkbox, so it submits with the form ("on" when checked). */
export default function Toggle({ name, label, description, checked, onChange }: Props) {
    return (
        <label className="flex items-center justify-between gap-4 p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-colors">
            <span>
                <span className="block text-sm font-medium text-white">{label}</span>
                {description && <span className="block text-xs text-gray-500 mt-0.5">{description}</span>}
            </span>
            <input type="checkbox" name={name} checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
            <span
                aria-hidden
                className="relative w-11 h-6 shrink-0 rounded-full bg-white/10 transition-colors peer-checked:bg-gradient-to-r peer-checked:from-violet-600 peer-checked:to-fuchsia-600 peer-focus-visible:ring-2 peer-focus-visible:ring-purple-500/60 after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-5"
            />
        </label>
    );
}
