"use client"

import { useState, useEffect } from "react"

const card = "rounded-lg border bg-white p-4 shadow-sm"
const btn = "rounded bg-blue-600 px-4 py-2 text-white"

const DetailsPage = () => {
    const [fact, setFact] = useState("Loading...")
    const [advice, setAdvice] = useState("Loading...")
    const [pokemon, setPokemon] = useState([])

    const loadFact = () => {
        fetch("https://catfact.ninja/fact")
            .then((res) => res.json())
            .then((data) => setFact(data.fact))
            .catch(() => setFact("Failed to load fact."))
    }

    const loadAdvice = () => {
        fetch("https://api.adviceslip.com/advice", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => setAdvice(data.slip.advice))
            .catch(() => setAdvice("Failed to load advice."))
    }

    useEffect(() => {
        loadFact()
        loadAdvice()
        fetch("https://pokeapi.co/api/v2/pokemon?limit=12")
            .then((res) => res.json())
            .then((data) => setPokemon(data.results))
            .catch(() => setPokemon([]))
    }, [])

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className={card}>
                    <h2 className="mb-2 font-semibold">Random Cat Fact</h2>
                    <p className="mb-3">{fact}</p>
                    <button onClick={loadFact} className={btn}>New Fact</button>
                </div>

                <div className={card}>
                    <h2 className="mb-2 font-semibold">Random Advice</h2>
                    <p className="mb-3">{advice}</p>
                    <button onClick={loadAdvice} className={btn}>New Advice</button>
                </div>
            </div>

            <div className={card}>
                <h2 className="mb-3 font-semibold">Pokémon List</h2>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                    {pokemon.map((p) => (
                        <li key={p.name} className="rounded border p-2 text-center capitalize">
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DetailsPage