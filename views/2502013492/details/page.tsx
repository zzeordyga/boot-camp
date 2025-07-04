'use client'

import { useState, useEffect } from 'react'

export default function DetailsPage() {
    const [gifUrl, setGifUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState<'wave' | 'bite'>('wave')

    const fetchGif = async () => {
        setLoading(true)
        const res = await fetch(`https://nekos.best/api/v2/${type}`)
        const data = await res.json()
        setGifUrl(data.results[0].url)
        setLoading(false)
    }

    useEffect(() => {
        fetchGif()
    }, [type])

    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4 capitalize">{type} GIF</h2>

            <div className="relative aspect-square w-full max-w-sm mx-auto mb-6">
                {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg animate-pulse">
                    <span>Loading...</span>
                </div>
                ) : (
                gifUrl && (
                    <img
                    src={gifUrl}
                    alt={`${type} gif`}
                    className="w-full h-full object-cover rounded-xl shadow-md"
                    />
                )
                )}
            </div>

            <div className="flex justify-center gap-4">
                <button
                onClick={() => setType('wave')}
                className={`px-4 py-2 rounded-xl ${
                    type === 'wave'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white border border-purple-600 text-purple-600'
                } transition`}
                >
                Show Wave
                </button>
                <button
                onClick={() => setType('bite')}
                className={`px-4 py-2 rounded-xl ${
                    type === 'bite'
                    ? 'bg-purple-500 text-white'
                    : 'bg-white border border-purple-500 text-purple-500'
                } transition`}
                >
                Show Bite
                </button>
            </div>
        </div>
    )
}