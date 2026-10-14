"use client";
import type { FallbackProps } from "./ErrorBoundary";

export default function ErrorFallback({ error, reset }: FallbackProps) {
    return (
        <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950"
        >
            <h2 className="text-lg font-semibold text-red-900 dark:text-red-200">
                Something went wrong
            </h2>
            <p className="mt-1 text-sm text-red-800 dark:text-red-300">
                We couldn&apos;t display this page. You can try again.
            </p>

            {error?.message && (
                <pre className="mt-4 overflow-x-auto rounded-lg bg-red-100 p-3 font-(family-name:--font-geist-mono) text-xs text-red-900 dark:bg-red-900/40 dark:text-red-200">
                    {error.message}
                </pre>
            )}

            <button
                onClick={reset}
                className="mt-4 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                Try again
            </button>
        </div>
    );
}