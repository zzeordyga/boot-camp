"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    setErrors((s) => ({ ...s, [e.target.name]: "", general: "" }));
  }

  function validate() {
    let ok = true;
    const newErr = { email: "", password: "", general: "" };

    if (!form.email) {
      newErr.email = "Email is required.";
      ok = false;
    } else if (!emailRegex.test(form.email)) {
      newErr.email = "Enter a valid email address.";
      ok = false;
    }

    if (!form.password) {
      newErr.password = "Password is required.";
      ok = false;
    }

    setErrors(newErr);
    return ok;
  }

  async function handleLogin(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const cred = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      const snap = await getDoc(doc(db, "users", cred.user.uid));
      const role = snap.exists() ? snap.data().role || "user" : "user";

      localStorage.setItem("uid", cred.user.uid);
      localStorage.setItem("role", role);

      if (role === "admin")
        router.push(process.env.NEXT_PUBLIC_BASE_URL + "/admin/dashboard");
      else router.push(process.env.NEXT_PUBLIC_BASE_URL + "/user/profile");
    } catch (err) {
      setErrors((s) => ({ ...s, general: err.message || "Login failed" }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Login</h1>

      <form onSubmit={handleLogin} noValidate>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            aria-invalid={!!errors.email}
            aria-describedby="email-error"
            inputMode="email"
          />
          {errors.email ? (
            <p id="email-error" style={{ color: "red" }}>
              {errors.email}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            value={form.password}
            onChange={handleChange}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
          />
          {errors.password ? (
            <p id="password-error" style={{ color: "red" }}>
              {errors.password}
            </p>
          ) : null}
        </div>

        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Logging in…" : "Login"}
        </button>
      </form>
    </main>
  );
}
