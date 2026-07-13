"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Layout from "./layout";

export default function CatFactDetail() {
    const [fact, setFact] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [image, setImage] = useState(1);

    const fetchFact = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://catfact.ninja/fact');
            const data = await response.json();
            setFact(data.fact);
            const randomNumber = Math.floor(Math.random() * 5) + 1;
            setImage(randomNumber);

        } catch (error) {
            setFact("Gagal mengambil data");
        } finally {
            setLoading(false);
        }


    }

    useEffect(() => {
        fetchFact();

    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.body.style.backgroundColor = "#222";
            document.body.style.color = "#eeeeeeff";
        } else {
            document.body.style.backgroundColor = "#eeeeeeff";
            document.body.style.color = "#222";
        }
        return () => {
            document.body.style.backgroundColor = "";
            document.body.style.color = "";
        };
    }, [isDarkMode]);

    const factLength = useMemo(() => {
        return fact.length;
    }, [fact])

    return (
        <Layout isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}>
            {loading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <i className='fa-solid fa-spinner fa-spin'></i>
                    <p>Loading....</p>
                </div>
            ) :
                (
                    <div>
                        <img src={`/cat${image}.jpg`} alt='gambar kucing' style={{ width: '50%', borderRadius: '10px' }}></img>
                        <p>{fact}</p>
                        <p style={{ fontWeight: 'lighter', color: isDarkMode ? '#e1e1e1ff' : '#a6a6a6ff' }}>{factLength} characters</p>
                        <button onClick={fetchFact}
                            style={{
                                padding: '12px 20px', cursor: 'pointer',
                                backgroundColor: isDarkMode ? '#f4f4f9' : '#111',
                                color: isDarkMode ? '#000' : '#fff',
                                border: 'none', borderRadius: '8px', fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%',
                                marginTop: '10px'
                            }}>New Facts</button>
                    </div>
                )
            }
        </Layout>
    )


}