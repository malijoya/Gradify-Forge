"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { login } from "../actions";

export default function LoginForm() {
    const [state, action, pending] = useActionState(login, undefined);
    const [show, setShow] = useState(false);

    return (
        <form action={action} className="space-y-4">
            <label className="block space-y-2">
                <span className="text-sm font-medium text-gray-300">Password</span>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        name="password"
                        type={show ? "text" : "password"}
                        required
                        autoFocus
                        autoComplete="current-password"
                        className="w-full h-12 bg-black/40 border border-white/10 rounded-xl pl-11 pr-12 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShow(!show)}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-lg text-gray-500 hover:text-white hover:bg-white/10"
                    >
                        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                </div>
            </label>
            {state?.error && (
                <p className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0" /> {state.error}
                </p>
            )}
            <button
                disabled={pending}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50 transition-opacity shadow-lg shadow-purple-900/30"
            >
                {pending && <Loader2 className="w-4 h-4 animate-spin" />}
                {pending ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
}
