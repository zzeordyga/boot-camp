"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleRegister(e) {
    e.preventDefault();
    
    if (!email || !password) {
        alert("Email dan password wajib diisi");
        return;
    } if (!email.includes("@")) {
        alert("Format email tidak valid");
        return;
    } if (password.length < 6) {
        alert("Password minimal 6 karakter");
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Simpan data user ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // default role
      });

      alert("Registrasi berhasil");
      router.push("/2440068423/posts"); // arahkan ke halaman login setelah register
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  return (
    <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
            <form onSubmit={handleRegister} className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                </div>

                <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition duration-200"
                >
                    Daftar
                </button>
            </form>
        </div>
    </>
  );
}
