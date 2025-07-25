"use client";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // ⬇ Tambahkan ini untuk menyimpan role ke Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: "user", // default role
      });

      router.push("/2501989462/assignment-10/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ display: "grid", gap: "15px" }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#0070f3",
          color: "#fff",
          fontWeight: "bold",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Register
      </button>
    </form>
  );
}
