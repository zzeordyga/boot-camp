"use client";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot, doc, getDoc, where, query } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [pet, setPet] = useState([]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [expandUserId, setExpandUserId] = useState(null);
    const toggleRow = (id) => {
        if (expandUserId === id) {
            setExpandUserId(null);
        } else {
            setExpandUserId(id);
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Gagal logout", error);
        }
    };

    useEffect(() => {
        let unsubsPet;
        let unsubsUser;
        const unsubsAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                const userCollection = collection(db, 'users');
                unsubsUser = onSnapshot(
                    userCollection, snapshot => {
                        const dataUser = snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data()
                        }));
                        setUser(dataUser);
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Gagal mengambil data user", error);
                        setError(error.message);
                        setLoading(false);
                    }
                )
                const petCollection = collection(db, "pets");
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
            if (unsubsUser) {
                unsubsUser();
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
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '40px',
                    borderBottom: '1px solid #f1f5f9',
                    paddingBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        margin: 0,
                        color: '#1e3a8a'
                    }}>
                        Admin Dashboard
                    </h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <div style={{
                            padding: '8px 20px',
                            background: '#ffffff',
                            borderRadius: '30px',
                            border: '1px solid #e2e8f0',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}>
                            <span style={{ width: '10px', height: '10px', backgroundColor: '#3b82f6', borderRadius: '50%', display: 'inline-block' }}></span>
                            Total Users: {user ? user.length : 0}
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: '8px 20px',
                                background: '#fee2e2',
                                border: 'none',
                                borderRadius: '30px',
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
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#94a3b8', fontSize: '18px' }}>
                        Memuat data pengguna...
                    </div>
                ) : error ? (
                    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#b91c1c', padding: '20px', borderRadius: '16px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontWeight: 'bold', margin: '0 0 10px 0' }}>Terjadi Kesalahan</p>
                        <p style={{ margin: 0, fontSize: '14px' }}>{error}</p>
                    </div>
                ) : (
                    <div style={{
                        display: 'block',
                        gap: '30px',
                    }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', borderRadius: '24px', overflow: 'hidden', background: '#ffffff' }}>
                            <thead>
                                <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</th>
                                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user && user.map((userData) => {
                                    const userPets = pet.filter((p) => p.ownerId === userData.id);

                                    return (
                                        <React.Fragment key={userData.id}>
                                            <tr style={{ borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                                                <td style={{ padding: '20px 24px', color: '#334155', fontWeight: '500' }}>{userData.email}</td>
                                                <td style={{ padding: '20px 24px', color: '#475569' }}>{userData.name}</td>
                                                <td style={{ padding: '20px 24px', textAlign: 'center' }}>
                                                    <button onClick={() => toggleRow(userData.id)} style={{ background: '#eff6ff', border: 'none', cursor: 'pointer', width: '36px', height: '36px', borderRadius: '50%', color: '#3b82f6', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }} onMouseOver={(e) => { e.currentTarget.style.background = '#dbeafe'; e.currentTarget.style.color = '#2563eb'; }} onMouseOut={(e) => { e.currentTarget.style.background = '#eff6ff'; e.currentTarget.style.color = '#3b82f6'; }}>
                                                        {expandUserId === userData.id ? (<i className="fa-solid fa-chevron-up"></i>) : (<i className="fa-solid fa-chevron-down"></i>)}
                                                    </button>
                                                </td>
                                            </tr>
                                            {expandUserId == userData.id && (
                                                <tr style={{ background: '#f8fafc', boxShadow: 'inset 0 4px 6px -4px rgba(0, 0, 0, 0.05)' }}>
                                                    <td colSpan="3" style={{ padding: '24px', borderBottom: '1px solid #e2e8f0' }}>
                                                        {userPets.length > 0 ? (
                                                            <div style={{ background: '#ffffff', borderRadius: '16px', padding: '20px', border: '1px solid #e2e8f0' }}>
                                                                <h4 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '15px' }}>Daftar Peliharaan</h4>
                                                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: '12px' }}>
                                                                    {userPets.map((userPet) => (
                                                                        <li key={userPet.id} style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                                                                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#e0e7ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', fontSize: '18px' }}>
                                                                                <i className="fa-solid fa-paw"></i>
                                                                            </div>
                                                                            <div>
                                                                                <div style={{ fontWeight: '600', color: '#1e3a8a', fontSize: '15px' }}>{userPet.name}</div>
                                                                                <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Species: <span style={{ fontWeight: '500', color: '#475569' }}>{userPet.type}</span></div>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : (
                                                            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', background: '#ffffff', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
                                                                <i className="fa-solid fa-ghost" style={{ fontSize: '24px', marginBottom: '8px', color: '#cbd5e1' }}></i>
                                                                <p style={{ margin: 0 }}>Pengguna ini belum memiliki peliharaan.</p>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            )}
                                        </React.Fragment>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}