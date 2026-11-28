"use client";

import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "../../lib/firebase";
import { useAuth } from "../../context/AuthContext";
import { validateAuthForm, validateField } from "../../utils/validation";

export default function LoginPage() {
  const { user, role } = useAuth();
  const router = useRouter();

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

    const validationErrors = validateAuthForm({ email, password });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setAuthError("Email atau password salah.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="page-container">
      <section className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <div className="form-group">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
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
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
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
            {submitting ? "Memproses..." : "Login"}
          </button>
        </form>

        <p className="switch-link">
          Belum punya akun? <Link href="/register">Register</Link>
        </p>
      </section>
    </main>
  );
}
