"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function DetailsPage() {
    const [fact, setFact] = useState("");

    useEffect(() => {
        fetch("https://catfact.ninja/fact")
            .then((res) => res.json())
            .then((data) => setFact(data.fact))
            .catch((err) => console.error("Error fetching cat fact:", err));
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
                Random Cat Fact 🐱
            </h2>

            {fact ? (
                <p className="bg-blue-50 p-4 rounded-xl text-gray-700">{fact}</p>
            ) : (
                <p>Loading...</p>
            )}

            <div className="mt-6">
                <Link href="/2501973306" className="text-blue-600 hover:underline">
                    ← Back to Main Page
                </Link>
            </div>
        </div>
    );
}