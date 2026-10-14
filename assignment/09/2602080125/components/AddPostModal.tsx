"use client";
import { useCallback, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firebaseDb } from "@/lib/firebase";

export default function AddPostModal() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({ title: "", content: "" });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const canSubmit = form.title.trim() !== "" && form.content.trim() !== "" && !saving;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const close = useCallback(() => {
        setOpen(false);
        setForm({ title: "", content: "" });
        setError(null);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") close();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, close]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!canSubmit) return;

        try {
            setSaving(true);
            setError(null);
            await addDoc(collection(firebaseDb, "posts"), {
                title: form.title.trim(),
                content: form.content.trim(),
                createdAt: serverTimestamp(),
            });
            close();
        } catch (err) {
            console.error(err);
            setError("Failed to save. Check your connection or Firestore rules.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                <span aria-hidden>+</span>
                New post
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                    onClick={close}
                >
                    <form
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-post-title"
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
                    >
                        <h2 id="add-post-title" className="text-xl font-semibold">
                            New post
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">
                            Share something with everyone on the board.
                        </p>

                        <div className="mt-5 flex flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="post-title" className="text-sm font-medium">
                                    Title
                                </label>
                                <input
                                    id="post-title"
                                    name="title"
                                    autoFocus
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Give your post a title"
                                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                                />
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="post-content" className="text-sm font-medium">
                                    Content
                                </label>
                                <textarea
                                    id="post-content"
                                    name="content"
                                    rows={5}
                                    value={form.content}
                                    onChange={handleChange}
                                    placeholder="What's on your mind?"
                                    className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
                                />
                            </div>
                        </div>

                        {error && (
                            <p
                                role="alert"
                                className="mt-4 text-sm text-red-600 dark:text-red-400"
                            >
                                {error}
                            </p>
                        )}

                        <div className="mt-6 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={close}
                                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={!canSubmit}
                                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                            >
                                {saving ? "Saving..." : "Publish"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}