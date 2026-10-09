"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

type Props = {
    name: string;
    options: readonly string[];
    placeholder: string;
    defaultValue?: string;
};

/**
 * Themed replacement for <select>. The chosen value is submitted through a hidden input,
 * so it works inside regular forms and server actions.
 */
export default function Select({ name, options, placeholder, defaultValue = "" }: Props) {
    const id = useId();
    const [value, setValue] = useState(defaultValue);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const [dropUp, setDropUp] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Close when clicking outside.
    useEffect(() => {
        if (!open) return;
        const onDown = (e: PointerEvent) => {
            if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onDown);
        return () => document.removeEventListener("pointerdown", onDown);
    }, [open]);

    // Keep the highlighted option scrolled into view.
    useEffect(() => {
        if (open) listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
    }, [open, active]);

    function openMenu() {
        const rect = buttonRef.current?.getBoundingClientRect();
        setDropUp(!!rect && window.innerHeight - rect.bottom < 300 && rect.top > 300);
        setActive(Math.max(0, options.indexOf(value)));
        setOpen(true);
    }

    function choose(i: number) {
        setValue(options[i]);
        setOpen(false);
        buttonRef.current?.focus();
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (!open) {
            if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
                e.preventDefault();
                openMenu();
            }
            return;
        }
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setActive((i) => Math.min(options.length - 1, i + 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                setActive((i) => Math.max(0, i - 1));
                break;
            case "Home":
                e.preventDefault();
                setActive(0);
                break;
            case "End":
                e.preventDefault();
                setActive(options.length - 1);
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                choose(active);
                break;
            case "Escape":
                e.preventDefault();
                setOpen(false);
                break;
            case "Tab":
                setOpen(false);
                break;
            default:
                // Type a letter to jump to the first matching option.
                if (e.key.length === 1) {
                    const i = options.findIndex((o) => o.toLowerCase().startsWith(e.key.toLowerCase()));
                    if (i >= 0) setActive(i);
                }
        }
    }

    return (
        <div ref={rootRef} className="relative">
            <input type="hidden" name={name} value={value} />
            <button
                ref={buttonRef}
                type="button"
                role="combobox"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={`${id}-list`}
                aria-activedescendant={open ? `${id}-${active}` : undefined}
                onClick={() => (open ? setOpen(false) : openMenu())}
                onKeyDown={onKeyDown}
                className={clsx(
                    "w-full flex items-center justify-between gap-2 bg-[#06060b] border rounded-[10px] px-4 py-3 min-h-12 text-[15px] text-left transition-colors focus:outline-none",
                    open ? "border-violet-400 ring-4 ring-violet-500/20" : "border-white/[0.16] hover:border-white/30 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/20"
                )}
            >
                <span className={clsx("truncate", value ? "text-white" : "text-gray-500")}>{value || placeholder}</span>
                <ChevronDown className={clsx("w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200", open && "rotate-180")} />
            </button>

            <ul
                ref={listRef}
                id={`${id}-list`}
                role="listbox"
                className={clsx(
                    "absolute z-30 inset-x-0 max-h-64 overflow-y-auto p-1.5 rounded-[12px] border border-white/10 bg-[#0e0e16] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.9)] transition-all duration-150",
                    dropUp ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top",
                    open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                )}
            >
                {options.map((option, i) => {
                    const selected = option === value;
                    return (
                        <li
                            key={option}
                            id={`${id}-${i}`}
                            role="option"
                            aria-selected={selected}
                            onPointerEnter={() => setActive(i)}
                            onClick={() => choose(i)}
                            className={clsx(
                                "flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm cursor-pointer select-none transition-colors",
                                i === active ? "bg-white/[0.08] text-white" : "text-gray-300",
                                selected && "text-purple-300"
                            )}
                        >
                            <span className="truncate">{option}</span>
                            {selected && <Check className="w-4 h-4 shrink-0 text-purple-400" />}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
