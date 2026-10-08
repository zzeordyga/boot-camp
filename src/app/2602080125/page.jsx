"use client"

import { useState, useEffect, useMemo, useRef } from "react"

const MyPage = () => {
    const [posts, setPosts] = useState([])
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(true)
    const inputRef = useRef(null)

    useEffect(() => {
        document.title = "Joey Liauw Wiharta"
        fetch("https://jsonplaceholder.typicode.com/posts?_limit=24")
            .then((res) => res.json())
            .then(setPosts)
            .catch(() => setPosts([]))
            .finally(() => setLoading(false))
    }, [])

    const filtered = useMemo(
        () => posts.filter((p) => p.title.toLowerCase().includes(query.toLowerCase())),
        [posts, query]
    )

    return (
        <div>
            <p className="mb-4">
                I am a Computer Science student with a strong interest in frontend development.
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search post title..."
                    className="min-w-[200px] flex-1 rounded border border-slate-300 px-3 py-2"
                />
                <button
                    onClick={() => inputRef.current.focus()}
                    className="rounded bg-blue-600 px-4 py-2 text-white"
                >
                    Focus Input
                </button>
            </div>

            {loading && <p>Loading...</p>}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                    <article key={p.id} className="rounded-lg border bg-white p-4 shadow-sm">
                        <h2 className="mb-2 font-semibold capitalize">{p.title}</h2>
                        <p className="text-sm text-slate-600">{p.body}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default MyPage