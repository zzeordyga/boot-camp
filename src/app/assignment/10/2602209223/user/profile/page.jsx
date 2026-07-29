"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, getDoc, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Profile() {
    const [loading, setLoading] = useState(true);
    const [pet, setPet] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    useEffect(() => {
        let unsubsPet;
        const unsubsAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email
                })
                const petCollection = query(collection(db, "pets"), where('ownerId', '==', currentUser.uid));
                unsubsPet = onSnapshot(
                    petCollection, (snapshot) => {
                        const data = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setPet(data);
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Gagal mengambil data", error);
                        setError(error.message);
                        setLoading(false);
                    }
                );

            }
            else {
                setUser(null);
            }
        })

        return () => {
            unsubsAuth();
            if (unsubsPet) {
                unsubsPet();
            }
        }

    }, []
    );

    return (
        <main style={{
            minHeight: '100vh',
            background: '#f4f7fe',
            padding: '40px 20px',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: '#334155'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#ffffff',
                borderRadius: '16px',
                padding: '40px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
                border: '1px solid #f1f5f9'
            }}>
                
                {/* Header Profile */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    marginBottom: '30px',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '30px'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#e0e7ff',
                        color: '#4f46e5',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: 'bold',
                        boxShadow: '0 4px 10px rgba(79, 70, 229, 0.15)',
                    }}>
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '28px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#1e293b' }}>Profil Saya</h1>
                        {user && <p style={{ color: '#64748b', margin: 0, fontSize: '15px' }}>{user.email}</p>}
                    </div>
                    <button 
                        onClick={handleLogout}
                        style={{ 
                            marginLeft: 'auto',
                            padding: '10px 20px', 
                            background: '#fee2e2', 
                            border: 'none',
                            borderRadius: '8px', 
                            color: '#ef4444', 
                            cursor: 'pointer', 
                            fontWeight: '600',
                            fontSize: '14px',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.background = '#fecaca'}
                        onMouseOut={(e) => e.target.style.background = '#fee2e2'}
                    >
                        Logout
                    </button>
                </div>

                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b' }}>
                    <span>🐾</span> Peliharaan Saya
                </h2>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
                        Memuat peliharaan...
                    </div>
                ) : error ? (
                    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '15px', borderRadius: '8px' }}>
                        {error}
                    </div>
                ) : pet.length > 0 ? (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '20px'
                    }}>
                        {pet.map((p) => (
                            <div key={p.id} style={{
                                background: '#f8fafc',
                                border: '1px solid #e2e8f0',
                                padding: '20px',
                                borderRadius: '12px',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                            }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', margin: '0 0 5px 0' }}>{p.name}</h3>
                                <p style={{ fontSize: '13px', color: '#64748b', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>{p.species}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={{ background: '#f8fafc', border: '1px dashed #cbd5e1', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
                        <p style={{ color: '#64748b', margin: 0 }}>Belum ada peliharaan yang ditambahkan.</p>
                    </div>
                )}
            </div>
        </main>
    );

}