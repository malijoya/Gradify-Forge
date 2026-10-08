"use client";

import { useRef } from "react";
import { useFormStatus } from "react-dom";
import { AlertTriangle, Loader2 } from "lucide-react";

type Props = {
    title: string;
    message: string;
    confirmLabel?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "title">;

/** Button that opens a styled confirmation dialog, then submits its form. */
export default function ConfirmButton({ title, message, confirmLabel = "Delete", children, ...props }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { pending } = useFormStatus();

    return (
        <>
            <button
                {...props}
                ref={buttonRef}
                type="button"
                disabled={pending}
                onClick={() => dialogRef.current?.showModal()}
            >
                {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : children}
            </button>

            <dialog
                ref={dialogRef}
                className="m-auto overflow-visible bg-transparent p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm"
                onClick={(e) => {
                    if (e.target === dialogRef.current) dialogRef.current.close();
                }}
            >
                <div className="w-[min(92vw,420px)] rounded-2xl border border-white/10 bg-[#0e0e18] p-6 shadow-2xl animate-fade-in-up">
                    <div className="flex gap-4">
                        <div className="grid place-items-center w-11 h-11 rounded-xl bg-red-500/10 ring-1 ring-inset ring-red-500/20 shrink-0">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                        </div>
                        <div className="space-y-1.5">
                            <h2 className="font-semibold text-lg">{title}</h2>
                            <p className="text-sm text-gray-400 leading-relaxed">{message}</p>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end gap-2">
                        <button
                            type="button"
                            autoFocus
                            onClick={() => dialogRef.current?.close()}
                            className="h-10 px-4 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                dialogRef.current?.close();
                                buttonRef.current?.form?.requestSubmit();
                            }}
                            className="h-10 px-4 rounded-xl text-sm font-semibold bg-red-600 hover:bg-red-500 transition-colors"
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}
