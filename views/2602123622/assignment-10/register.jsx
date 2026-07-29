"use client";

import { useState } from "react";
import { useAuth } from "./authContext";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const validateName = (value) => {
    if (!value.trim()) return "Name is required";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    return "";
  };

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

  const validateConfirmPassword = (value) => {
    if (!value) return "Please confirm your password";
    if (value !== password) return "Passwords do not match";
    return "";
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(validateName(e.target.value));
    setGeneralError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(validateEmail(e.target.value));
    setGeneralError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(validatePassword(e.target.value));
    if (confirmPassword) {
      setConfirmPasswordError(validateConfirmPassword(confirmPassword));
    }
    setGeneralError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(validateConfirmPassword(e.target.value));
    setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    const confirmErr = validateConfirmPassword(confirmPassword);

    if (nameErr || emailErr || passwordErr || confirmErr) {
      setNameError(nameErr);
      setEmailError(emailErr);
      setPasswordError(passwordErr);
      setConfirmPasswordError(confirmErr);
      return;
    }

    setSubmitting(true);
    setGeneralError("");

    try {
      await register(email, password, name, role);
      router.push("/2602123622/assignment-10/profile");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setGeneralError("An account with this email already exists");
      } else if (err.code === "auth/weak-password") {
        setGeneralError("Password is too weak. Use at least 6 characters");
      } else if (err.code === "auth/invalid-email") {
        setGeneralError("Please enter a valid email address");
      } else if (err.code === "auth/operation-not-allowed") {
        setGeneralError("Email/password accounts are not enabled");
      } else {
        setGeneralError("Registration failed. Please try again");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authForm}>
        <h2>Create Account</h2>

        {generalError && <div className={styles.errorBox}>{generalError}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              value={name}
              onChange={handleNameChange}
              required
              autoComplete="name"
            />
            {nameError && <div className={styles.error}>{nameError}</div>}
          </div>

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
              placeholder="At least 6 characters"
              value={password}
              onChange={handlePasswordChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
            {passwordError && (
              <div className={styles.error}>{passwordError}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              minLength={6}
              autoComplete="new-password"
            />
            {confirmPasswordError && (
              <div className={styles.error}>{confirmPasswordError}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className={styles.btn} disabled={submitting}>
            {submitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className={styles.link}>
          Already have an account?{" "}
          <a href="/2602123622/assignment-10/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}
