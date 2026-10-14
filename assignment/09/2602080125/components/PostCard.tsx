import type { Posts } from "@/types/posts";
import Time from "./Time";

interface PostCardProps {
    post: Posts;
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <article className="min-w-0 overflow-hidden rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <header className="flex items-start justify-between gap-4">
                <h2 className="min-w-0 wrap-break-word text-lg font-semibold leading-snug">
                    {post.title}
                </h2>
                <Time
                    date={post.createdAt?.toDate() ?? null}
                    className="shrink-0 whitespace-nowrap pt-1 text-xs text-zinc-500"
                />
            </header>

            <p className="mt-2 whitespace-pre-wrap wrap-break-word text-zinc-600 dark:text-zinc-400">
                {post.content}
            </p>
        </article>
    );
}