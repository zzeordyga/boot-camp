import Link from "next/link";
import AddPostModal from "@/components/AddPostModal";

const cards = [
  {
    href: "/posts-getdocs",
    title: "Explore Posts",
    desc: "Catch up on everything the community has shared. Loaded once, no distractions.",
    note: "getDocs",
  },
  {
    href: "/posts",
    title: "Live Feed",
    desc: "Watch posts land in real time and search by title. No refresh needed.",
    note: "onSnapshot",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-10 p-6 py-16">

        {/* Header */}
        <header className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex min-w-0 flex-col gap-3">
            <h1 className="text-5xl font-semibold tracking-tight">
              Public Posts
            </h1>
            <p className="wrap-break-word text-lg text-zinc-600 dark:text-zinc-400">
              An open board for sharing ideas and reading what others are thinking, live.
            </p>
          </div>

          <div className="shrink-0">
            <AddPostModal />
          </div>
        </header>

        {/* Section Main */}
        <section className="grid gap-6 sm:grid-cols-2">
          {cards.map((data) => (
            <Link
              key={data.href}
              href={data.href}
              className="group flex flex-col justify-between gap-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm transition hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
            >
              <div>
                <h2 className="text-2xl font-semibold">{data.title}</h2>
                <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
                  {data.desc}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <code className="rounded-md bg-zinc-100 px-2 py-1 font-(family-name:--font-geist-mono) text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  {data.note}
                </code>
                <span className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition group-hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:group-hover:bg-zinc-200">
                  Open
                  <span className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-200 px-6 py-4 text-right text-xs text-zinc-500 dark:border-zinc-800">
        Built with Next.js & Firebase Firestore · Assignment 09
      </footer>
    </div>
  );
}