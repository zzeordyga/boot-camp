import Link from "next/link";

const menuOption = [
    {
        id: 1,
        title: "Posts",
        description: "Search articles and read their complete details.",
        href: "/2602080125/json-placeholder",
        icon: "📝",
    },
];

const HomePage = () => {
    return (
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
            {/* Title Section */}
            <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-7 sm:p-9">
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                    React & Next.js Integration
                </h1>
                <div className="mt-4 h-1 w-16 rounded-full bg-emerald-600" />
                <p className="mt-4 max-w-xl leading-7 text-slate-500">
                    Explore public APIs to discover articles, Pokémon, cat facts, and daily advice.
                </p>
            </div>

            {/* Card Navigation Section */}
            <div className="grid gap-5">
                {menuOption.map((data) => (
                    <Link
                        key={data.id}
                        href={data.href}
                        className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg sm:p-7"
                    >
                        <span className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">{data.icon}</span>
                        <h2 className="mt-4 text-xl font-semibold text-slate-900 transition-colors group-hover:text-emerald-700">{data.title}</h2>
                        <p className="mt-1 flex-1 leading-6 text-slate-500">{data.description}</p>

                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-sm font-medium text-slate-600">
                                Explore API
                            </span>
                            <span className="text-lg text-emerald-700 transition-transform group-hover:translate-x-1">
                                →
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default HomePage;