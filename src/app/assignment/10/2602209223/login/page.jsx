"use client";
import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegis, setIsRegis] = useState(false);
    const [name, setName] = useState("");



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (isRegis) {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: email,
                    role: "user",
                    name: name
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            console.error("Gagal Login", error);
            alert("Gagal login: " + error.message);
        }
    }

    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f4f7fe',
            padding: '20px',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            <div style={{
                background: '#ffffff',
                borderRadius: '16px',
                padding: '40px 30px',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.04)',
                width: '100%',
                maxWidth: '400px',
                color: '#1e293b',
                textAlign: 'center'
            }}>
                <div style={{ marginBottom: '25px' }}>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#1e3a8a' }}>
                        {isRegis ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                        {isRegis ? "Enter your details to create a new account." : "Enter your credentials to access your account."}
                    </p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'left' }}>
                    {isRegis && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            <label style={{ fontSize: '13px', color: '#475569', fontWeight: '500', marginLeft: '4px' }}>Full Name</label>
                            <input
                                type="text"
                                required
                                placeholder="e.g., John Doe"
                                onChange={(e) => setName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    background: '#f8fafc',
                                    color: '#334155',
                                    outline: 'none',
                                    fontSize: '14px',
                                    boxSizing: 'border-box'
                                }}
                            />
                        </div>
                    )}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', color: '#475569', fontWeight: '500', marginLeft: '4px' }}>Email Address</label>
                        <input
                            type="email"
                            required
                            placeholder="e.g., john@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#334155',
                                outline: 'none',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <label style={{ fontSize: '13px', color: '#475569', fontWeight: '500', marginLeft: '4px' }}>Password</label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            placeholder="e.g., ••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                borderRadius: '8px',
                                border: '1px solid #e2e8f0',
                                background: '#f8fafc',
                                color: '#334155',
                                outline: 'none',
                                fontSize: '14px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '14px',
                            marginTop: '10px',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#3b82f6',
                            color: 'white',
                            fontSize: '15px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)',
                            transition: 'background 0.2s'
                        }}
                    >
                        {isRegis ? "Register" : "Sign In"}
                    </button>
                </form>

                <p style={{ marginTop: "25px", fontSize: '13px', color: '#64748b' }}>
                    {isRegis ? "Sudah punya akun? " : "Belum punya akun? "}
                    <span 
                        onClick={() => setIsRegis(!isRegis)} 
                        style={{ color: '#3b82f6', cursor: 'pointer', fontWeight: '600' }}
                    >
                        {isRegis ? "Login di sini" : "Buat akun sekarang"}
                    </span>
                </p>
            </div>
        </main>
    )
}