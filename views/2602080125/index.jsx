"use client"

import { useState, useEffect, useMemo, useRef } from "react"

const MyPage = () => {
    const [count, setCount] = useState(0)
    const inputRef = useRef(null)

    useEffect(() => {
        document.title = "Joey Liauw Wiharta"
    }, [])

    const message = useMemo(() => {
        if (count === 0) {
            return "Button hasn't been clicked yet."
        }

        return `Button clicked ${count} ${count === 1 ? "time" : "times"}.`
    }, [count])

    const handleFocus = () => {
        inputRef.current.focus()
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
                <h1 className="text-3xl font-bold text-gray-900">
                    Joey Liauw Wiharta - 2602080125
                </h1>

                <p className="mt-4 leading-7 text-gray-600">
                    I am a Computer Science student with a strong interest in frontend
                    development. I have experience building web applications with React and
                    TypeScript, including reusable components, responsive interfaces, and
                    microfrontend applications using modern tools such as Vite and Tailwind
                    CSS.
                </p>

                <hr className="my-8 border-gray-200" />

                <h2 className="text-xl font-semibold text-gray-900">
                    React Hooks Demo
                </h2>

                <p className="mt-3 text-gray-600">
                    {message}
                </p>

                <div className="mt-4">
                    <button
                        onClick={() => setCount((count) => count + 1)}
                        className="rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition hover:bg-green-700 active:scale-95"
                    >
                        Click Me
                    </button>
                </div>

                <div className="mt-6 flex gap-3">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="useRef example"
                        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    <button
                        onClick={handleFocus}
                        className="rounded-lg border border-green-600 px-4 py-2 font-medium text-green-600 transition hover:bg-green-50"
                    >
                        Focus Input
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MyPage