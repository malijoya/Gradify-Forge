"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Plus } from "lucide-react";
import { clsx } from "clsx";

type Props = {
    name: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
};

/** Themed dropdown that also lets you type a brand-new category. */
export default function CategoryPicker({ name, options, value, onChange }: Props) {
    const id = useId();
    const [open, setOpen] = useState(false);
    const [typing, setTyping] = useState(false);
    const [active, setActive] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const query = value.trim().toLowerCase();
    const matches = typing ? options.filter((o) => o.toLowerCase().includes(query)) : options;
    const canCreate = typing && !!query && !options.some((o) => o.toLowerCase() === query);
    const items = canCreate ? [...matches, `__create__`] : matches;

    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [open]);

    useEffect(() => {
        if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
    }, [open, active]);

    function show() {
        setTyping(false);
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
    }

    function pick(i: number) {
        const item = items[i];
        if (item === undefined) return;
        onChange(item === "__create__" ? value.trim() : item);
        setOpen(false);
        setTyping(false);
    }

    return (
        <div ref={rootRef} className="relative">
            <div
                className={clsx(
                    "flex items-center bg-black/40 border rounded-xl transition-colors",
                    open ? "border-purple-500 ring-2 ring-purple-500/20" : "border-white/10 hover:border-white/20"
                )}
            >
                <input
                    name={name}
                    value={value}
                    role="combobox"
                    aria-expanded={open}
                    aria-controls={`${id}-list`}
                    aria-autocomplete="list"
                    autoComplete="off"
                    placeholder="Pick or type a category"
                    onFocus={show}
                    onClick={() => !open && show()}
                    onChange={(e) => {
                        onChange(e.target.value);
                        setTyping(true);
                        setActive(0);
                        setOpen(true);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "ArrowDown") {
                            e.preventDefault();
                            if (!open) show();
                            else setActive((i) => Math.min(items.length - 1, i + 1));
                        } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            setActive((i) => Math.max(0, i - 1));
                        } else if (e.key === "Enter" && open) {
                            e.preventDefault();
                            pick(active);
                        } else if (e.key === "Escape" || e.key === "Tab") {
                            setOpen(false);
                        }
                    }}
                    className="flex-1 min-w-0 bg-transparent px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none"
                />
                <button
                    type="button"
                    tabIndex={-1}
                    aria-label="Show categories"
                    onClick={() => (open ? setOpen(false) : show())}
                    className="px-3 self-stretch text-gray-400 hover:text-white"
                >
                    <ChevronDown className={clsx("w-4 h-4 transition-transform", open && "rotate-180")} />
                </button>
            </div>

            <ul
                ref={listRef}
                id={`${id}-list`}
                role="listbox"
                className={clsx(
                    "absolute z-30 inset-x-0 top-full mt-2 max-h-64 overflow-y-auto p-1.5 rounded-xl border border-white/10 bg-[#0e0e18]/95 backdrop-blur-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] origin-top transition-all duration-150",
                    open && items.length ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
            >
                {items.map((item, i) => {
                    const create = item === "__create__";
                    const selected = !create && item === value;
                    return (
                        <li
                            key={item}
                            role="option"
                            aria-selected={selected}
                            onPointerEnter={() => setActive(i)}
                            onPointerDown={(e) => e.preventDefault()}
                            onClick={() => pick(i)}
                            className={clsx(
                                "flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none",
                                i === active ? "bg-white/[0.08] text-white" : "text-gray-300",
                                create && "text-purple-300"
                            )}
                        >
                            {create ? (
                                <span className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" /> Create &ldquo;{value.trim()}&rdquo;
                                </span>
                            ) : (
                                <span className="truncate">{item}</span>
                            )}
                            {selected && <Check className="w-4 h-4 text-purple-400 shrink-0" />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
