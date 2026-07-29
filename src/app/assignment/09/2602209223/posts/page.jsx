"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function PostPage() {
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const postCollection = collection(db, 'posts');
        const unsubs = onSnapshot(
            postCollection,
            (snapshot) => {
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPost(data);
                setLoading(false);
            },
            (error) => {
                console.error("Gagal mengambil data", error);
                setError(error.message);
                setLoading(false);
            }
        );

        return () => {
            unsubs();
        }
    }, []);

    const filteredPosts = post.filter((item) => {
        if (!item.title) return false;
        return item.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <main style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Daftar Postingan</h1>

            <div style={{ marginBottom: '2rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'white'
                }}>
                    <i className="fa-solid fa-magnifying-glass" style={{ color: '#888', marginRight: '10px' }}></i>
                    <input
                        type="text"
                        placeholder="Cari judul postingan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            fontSize: '16px'
                        }}
                    />
                </div>
            </div>

            {error && (
                <div style={{ color: 'white', backgroundColor: '#e74c3c', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                    <strong>Maaf, terjadi kesalahan:</strong> {error}
                </div>
            )}

            {loading && (
                <p style={{ textAlign: 'center', color: '#888' }}>Sedang memuat data...</p>
            )}

            {!loading && !error && (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((item) => (
                            <div key={item.id} style={{
                                padding: '1.5rem',
                                border: '1px solid #eee',
                                borderRadius: '8px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                            }}>
                                <h2 style={{ marginTop: 0, marginBottom: '0.5rem', color: '#2c3e50' }}>{item.title}</h2>
                                <p style={{ color: '#555', lineHeight: '1.5', margin: 0 }}>{item.content}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center', color: '#888' }}>Tidak ada postingan yang ditemukan.</p>
                    )}
                </div>
            )}
        </main>
    );
}