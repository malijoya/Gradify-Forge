"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";

/** Submit button that shows a spinner while its form's server action runs. */
export default function ActionButton({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    const { pending } = useFormStatus();
    return (
        <button {...props} type="submit" disabled={pending || props.disabled} className={clsx(className, "disabled:opacity-60")}>
            {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
        </button>
    );
}
