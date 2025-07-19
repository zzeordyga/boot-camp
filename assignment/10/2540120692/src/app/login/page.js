"use client";
import Link from "next/link";
import styles from "./page.module.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import getConfig from "@/firebase/config";
import { Modal } from "@/components/modal";

export default function LoginPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleCloseModal = (event) => {
    setErrors({
      ...errors,
      general: ""
    });
  }

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
    setErrors({
      ...errors,
      [event.target.name]: ""
    });
  }

  const validate = () => {
    const newErrors = {}
    if (!form.email) {
      newErrors.email = "Email is empty";
    }
    if (!form.password) {
      newErrors.password = "Password is empty";
    }
    return newErrors
  }

  const handleLogin = () => {
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
    } else {
      setErrors({});
      const { auth } = getConfig()
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(() => {
          router.push('/')
        })
        .catch(error => {
          setErrors({
            ...errors,
            general: error.message
          });
        })
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Login</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Email:</label>
          <input type="email" name="email" className={styles.inputField} onChange={handleChange} />
          {errors.email && (<div className={styles.errorMessage}>{errors.email}</div>)}
        </div>
        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={styles.inputField}
            onChange={handleChange}
          />
          {errors.password && (<div className={styles.errorMessage}>{errors.password}</div>)}
        </div>
        <button className={styles.submitButton} onClick={handleLogin}>Login</button>
        <div className={`${styles.formGroup} ${styles.registerPrompt}`}>
          <label>Don&apos;t have an account?</label>
          <Link href="/register" className={styles.registerLink}>
            Register
          </Link>
        </div>
        {errors.general && (
          <Modal
            title="Login Error"
            message={errors.general}
            status="FAILED"
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}
