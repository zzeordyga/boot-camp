'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { userLogin } from "../../../firebase/authService";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import styles from './login.module.css';

const Login = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

    const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await userLogin(form.email, form.password);
      const user = userCredential.user;

      const userDocRef = doc(db, "users", user.uid); // 👈 get reference
      const userSnap = await getDoc(userDocRef);     // 👈 get data

      if (userSnap.exists()) {
        const role = userSnap.data().role;

        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/profile");
        }
      } else {
        console.error("User not found in Firestore");
        setMessage("Login failed: User role not found.");
      }
    } catch (error) {
      console.error("Failed to login", error);
      setMessage("Failed login, please check your email and password!");
    }
  };


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: ""
    });
  };

  return (
    <form onSubmit={handleLogin} className={styles.formContainer}>
      <h2>Login</h2>

      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          className={styles.inputField}
        />
      </div>

      <button type="submit" className={styles.submitButton}>Login</button>
      <button
        type="button"
        className={styles.backButton}
        onClick={() => router.push('/')}
      >
        Back to Home
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </form>
  );
};

export default Login;
