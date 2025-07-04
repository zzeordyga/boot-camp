'use client'
import { useState, useEffect, useRef, useMemo } from 'react'

export default function HomePage() {
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const countRef = useRef(0)

    const fetchImage = async () => {
        setLoading(true)
        const res = await fetch('https://nekos.best/api/v2/neko')
        const data = await res.json()
        setImageUrl(data.results[0].url)
        countRef.current += 1
        setLoading(false)
    }

    useEffect(() => {
        fetchImage()
    }, [])

    const memoizedNote = useMemo(() => {
        return `You've fetched ${countRef.current} neko image(s)`
    }, [imageUrl])

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Random Neko Image</h2>

            <div className="relative aspect-square w-full max-w-sm mx-auto mb-6">
                {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg animate-pulse">
                    <span>Loading...</span>
                </div>
                ) : (
                imageUrl && (
                    <img
                    src={imageUrl}
                    alt="Neko"
                    className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                )
                )}
            </div>

            <button
                onClick={fetchImage}
                className="bg-purple-600 text-white px-6 py-2 rounded-xl hover:bg-purple-700 transition-colors"
            >
                Load New
            </button>

            <p className="text-sm mt-4 text-gray-500 italic">{memoizedNote}</p>
        </div>
    )
}