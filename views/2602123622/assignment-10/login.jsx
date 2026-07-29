"use client";

import { useState } from "react";
import { useAuth } from "./authContext";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validateEmail = (value) => {
    if (!value.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (value) => {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
    setGeneralError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    if (emailErr || passwordErr) {
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      return;
    }

    setSubmitting(true);
    setGeneralError("");

    try {
      await login(email, password);
      router.push("/2602123622/assignment-10/profile");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setGeneralError("No account found with this email address");
      } else if (err.code === "auth/wrong-password") {
        setGeneralError("Incorrect password. Please try again");
      } else if (err.code === "auth/invalid-credential") {
        setGeneralError("Invalid email or password");
      } else if (err.code === "auth/too-many-requests") {
        setGeneralError("Too many login attempts. Please try again later");
      } else {
        setGeneralError("Login failed. Please check your credentials");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>
        <h2>Sign In</h2>

        {generalError && <div className={styles.errorBox}>{generalError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={handleEmailChange}
              required
              autoComplete="email"
            />
            {emailError && <div className={styles.error}>{emailError}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={6}
              autoComplete="current-password"
            />
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>

          <button type="submit" className={styles.btn} disabled={submitting}>
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.link}>
          Don't have an account?{" "}
          <a href="/2602123622/assignment-10/register">Create one</a>
        </div>
      </div>
    </div>
  );
}
