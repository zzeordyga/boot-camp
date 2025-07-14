"use client";
import { useState } from "react";
import styles from "./register.module.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { auth, db } from "../../../firebase/config";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is empty!";
    if (!form.email) newErrors.email = "Email cannot be empty!";
    if (!form.password) newErrors.password = "Password must be filled!";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required!";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match!";
    if (parseInt(form.age) < 10 || form.age === "")
      newErrors.age = "Please enter a valid age (11 or older)!";
    return newErrors;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validateErrors = validate();
    console.log("Register Button CLicked!")
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: form.name,
        email: user.email,
        age: form.age,
        role: "user",
      });

      router.push("/");
    } catch (error) {
      console.error("Firebase registration error:", error);
    }
  };

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Register</h2>
      <form className={styles.form} onSubmit={handleRegister}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className={styles.inputField}
            onChange={handleChange}
            value={form.name}
          />
          {errors.name && <div className={styles.errorMessage}>{errors.name}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className={styles.inputField}
            onChange={handleChange}
            value={form.email}
          />
          {errors.email && <div className={styles.errorMessage}>{errors.email}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className={styles.inputField}
            onChange={handleChange}
            value={form.password}
          />
          {errors.password && <div className={styles.errorMessage}>{errors.password}</div>}
        </div>

        <div className={styles.formGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            className={styles.inputField}
            onChange={handleChange}
            value={form.confirmPassword}
          />
          {errors.confirmPassword && (
            <div className={styles.errorMessage}>{errors.confirmPassword}</div>
          )}
        </div>

        <div className={styles.formGroup}>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            className={styles.inputField}
            onChange={handleChange}
            value={form.age}
          />
          {errors.age && <div className={styles.errorMessage}>{errors.age}</div>}
        </div>

        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.submitButton}>
            Login
          </button>
          <button
            type="button"
            className={styles.backButton}
            onClick={() => router.push('/')}
          >
            Back to Home
          </button>
        </div>
      </form>
    </div>
  );
}
