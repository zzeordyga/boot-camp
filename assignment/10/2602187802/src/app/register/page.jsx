"use client";

import { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth, db } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { validateAuthForm, validateField } from "../../utils/validation";

const REGISTER_ERROR_MESSAGES = {
  "auth/email-already-in-use": "Email sudah terdaftar.",
  "auth/invalid-email": "Format email tidak valid.",
  "auth/weak-password": "Password minimal 6 karakter.",
  "permission-denied": "Akses ditolak oleh Firestore Rules. Periksa data atau rules.",
};

export default function RegisterPage() {
  const { user, role } = useAuth();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user && role) {
      router.replace(role === "admin" ? "/admin/dashboard" : "/user/profile");
    }
  }, [user, role, router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setAuthError("");

    const validationErrors = validateAuthForm(
      { username, email, password },
      { requireUsername: true }
    );
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      await setDoc(doc(db, "users", cred.user.uid), {
        username: username.trim(),
        email: cred.user.email,
        role: "user",
      });
    } catch (err) {
      setAuthError(
        REGISTER_ERROR_MESSAGES[err.code] ||
          "Registrasi gagal. Periksa kembali data Anda."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-container">
      <section className="card">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="register-username">Username</label>
            <input
              id="register-username"
              type="text"
              required
              minLength={3}
              className={errors.username ? "input-error" : ""}
              value={username}
              onChange={(e) => {
                const val = e.target.value;
                setUsername(val);
                setErrors((prev) => ({
                  ...prev,
                  username: validateField("username", val),
                }));
              }}
              placeholder="Minimal 3 karakter (huruf, angka, _)"
            />
            {errors.username && <p className="field-error">{errors.username}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="register-email">Email</label>
            <input
              id="register-email"
              type="email"
              required
              className={errors.email ? "input-error" : ""}
              value={email}
              onChange={(e) => {
                const val = e.target.value;
                setEmail(val);
                setErrors((prev) => ({ ...prev, email: validateField("email", val) }));
              }}
              placeholder="nama@gmail.com"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              type="password"
              required
              minLength={6}
              className={errors.password ? "input-error" : ""}
              value={password}
              onChange={(e) => {
                const val = e.target.value;
                setPassword(val);
                setErrors((prev) => ({
                  ...prev,
                  password: validateField("password", val),
                }));
              }}
              placeholder="Minimal 6 karakter"
            />
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          {authError && <p className="auth-error">{authError}</p>}

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Memproses..." : "Register"}
          </button>
        </form>

        <p className="switch-link">
          Sudah punya akun? <Link href="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}
