"use client";
import { useState } from "react";
import styles from "./page.module.css";
import getConfig from "@/firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/modal";

export default function RegisterPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: ""
  });

  const [errors, setErrors] = useState({});

  const handleCloseModal = (event) => {
    setSubmitted(false)
    if (!errors.general) {
      router.push('/login');
    }
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
    if (!form.name) {
      newErrors.name = "Name is empty";
    }
    if (!form.email) {
      newErrors.email = "Email is empty";
    }
    if (!form.password) {
      newErrors.password = "Password is empty";
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is empty";
    }
    if (form.age < 1) {
      newErrors.age = "Age is not valid";
    }
    return newErrors;
  }

  const handleRegister = () => {
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors)
    } else {
      setErrors({});
      const { db, auth } = getConfig()
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(db, "users", user.uid), {
            name: form.name,
            email: user.email,
            age: form.age,
            role: "user"
          });
          setSubmitted(true);
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
    <div className={styles.page} >
      <h2 className={styles.title}>Register</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label>Name:</label>
          <input type="text" name="name" className={styles.inputField} onChange={handleChange} />
          {errors.name && (<div className={styles.errorMessage}>{errors.name}</div>)}
        </div>
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
        <div className={styles.formGroup}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            className={styles.inputField}
            onChange={handleChange}
          />
          {errors.confirmPassword && (<div className={styles.errorMessage}>{errors.confirmPassword}</div>)}
        </div>
        <div className={styles.formGroup}>
          <label>Age:</label>
          <input type="number" name="age" className={styles.inputField} onChange={handleChange} />
          {errors.age && (<div className={styles.errorMessage}>{errors.age}</div>)}
        </div>
        <button type="submit" className={styles.submitButton} onClick={handleRegister}>
          Register
        </button>
        {submitted && (
          <Modal
            title="Registration Sucess"
            message="thank you for register new account"
            status="SUCCESS"
            onClose={handleCloseModal}
          />
        )}
        {errors.general && (
          <Modal
            title="Registration Error"
            message={errors.general}
            status="FAILED"
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div >
  );
}
