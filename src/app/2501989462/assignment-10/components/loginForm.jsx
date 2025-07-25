"use client";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // User does not exist in Firestore, create default
        await setDoc(userRef, {
          email: user.email,
          role: "user",
        });
        router.push("/user/profile");
      } else {
        const userData = docSnap.data();
        if (userData.role === "admin") {
          router.push("/2501989462/assignment-10/admin/dashboard");
        } else {
          router.push("/2501989462/assignment-10");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ display: "grid", gap: "15px" }}>
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
        Login
      </button>
    </form>
  );
}
