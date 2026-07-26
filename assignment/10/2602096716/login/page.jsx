"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const snap = await getDoc(doc(db, "users", cred.user.uid));

      if (!snap.exists()) {
        setError("Data role pengguna tidak ditemukan.");
        setLoading(false);
        return;
      }

      const { role } = snap.data();
      router.push(role === "admin" ? "/2602096716/admin/dashboard" : "/2602096716/user/profile");
    } catch (err) {
      console.error(err);
      setError("Email atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-16 p-6 border rounded-lg bg-white space-y-4">
      <h1 className="text-xl font-bold text-indigo-800">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-700 text-white rounded disabled:opacity-50"
        >
          {loading ? "Memproses..." : "Login"}
        </button>
      </form>
      <p className="text-sm text-gray-500">
        Belum punya akun?{" "}
        <a href="/2602096716/register" className="text-indigo-700 underline">Daftar</a>
      </p>
    </div>
  );
}