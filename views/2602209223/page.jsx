"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function kartuMhs() {
    const name = "Herdiani Angela Fortuna Salsabilla";
    const nim = "2602209223";
    const program = "Computer Science";

    const [isDarkMode, setIsDarkMode] = useState(false);
    const nimRef = useRef(null);

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

    const handleCopyNim = () => {
        if (nimRef.current) {
            navigator.clipboard.writeText(nimRef.current.innerText);
            alert("NIM berhasil di copy");

        }
    };

    return (
        <div style={{
            padding: '40px 30px',
            margin: '50px auto',
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: isDarkMode ? '0 8px 25px rgba(255,255,255,0.05)' : '0 8px 25px rgba(0,0,0,0.1)',
            backgroundColor: isDarkMode ? '#2d2d2d' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#333333',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            textAlign: 'center',
            transition: 'all 0.4s ease'
        }}>

            <h2 style={{ fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', color: isDarkMode ? '#888' : '#777', margin: '0 0 15px 0' }}>
                Kartu Mahasiswa
            </h2>
            <hr style={{ border: 'none', height: '1px', backgroundColor: isDarkMode ? '#444' : '#eee', marginBottom: '25px' }} />

            <h1 style={{ fontSize: '22px', margin: '0 0 15px 0' }}>{name}</h1>

            {/* NIM dan Icon Copy dibungkus dalam div agar sejajar secara rapi */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>
                    NIM : <span ref={nimRef}>{nim}</span>
                </p>
                <i
                    onClick={handleCopyNim}
                    style={{ cursor: 'pointer', fontStyle: 'normal', fontSize: '18px', transition: 'transform 0.2s' }}
                    title="Copy NIM"
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.2)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                    📋
                </i>
            </div>

            <h3 style={{ fontSize: '16px', color: isDarkMode ? '#66b3ff' : '#0056b3', margin: '0 0 10px 0' }}>
                Computer Science Semarang
            </h3>

            <p style={{ fontSize: '14px', fontStyle: 'italic', lineHeight: '1.6', color: isDarkMode ? '#bbb' : '#666', margin: '0 0 30px 0' }}>
                "Pada prodi ini saya belajar memecahkan masalah menggunakan logika dan algoritma pemrograman."
            </p>

            <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                style={{
                    padding: '12px 20px', cursor: 'pointer',
                    backgroundColor: isDarkMode ? '#f4f4f9' : '#111',
                    color: isDarkMode ? '#000' : '#fff',
                    border: 'none', borderRadius: '8px', fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
            >
                {isDarkMode ? '☀️ Beralih ke Light Mode' : '🌙 Beralih ke Dark Mode'}
            </button>
        </div>
    )
}