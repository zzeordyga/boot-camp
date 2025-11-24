"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "user" });
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
    } else if (form.password.length < 6) {
      newErr.password = "Password must be at least 6 characters.";
      ok = false;
    }

    setErrors(newErr);
    return ok;
  }

  async function handleRegister(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      await setDoc(doc(db, "users", cred.user.uid), {
        email: form.email,
        role: form.role,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("uid", cred.user.uid);
      localStorage.setItem("role", form.role);

      router.push(process.env.NEXT_PUBLIC_BASE_URL + "/login");
    } catch (err) {
      setErrors((s) => ({
        ...s,
        general: err.message || "Registration failed",
      }));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Register</h1>

      <form onSubmit={handleRegister} noValidate>
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
            minLength={6}
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

        <div>
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        {errors.general && <p style={{ color: "red" }}>{errors.general}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Registering…" : "Register"}
        </button>
      </form>
    </main>
  );
}
