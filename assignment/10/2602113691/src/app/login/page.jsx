'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import getConfig from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
  }

  const validateForm = () => {
    const newErrors = {}
    if(!form.email) newErrors.email = 'Email is required'
    if(!form.password) newErrors.password = 'Password is required'

    return newErrors
  }

  const handleLogin = () => {
    const validationError = validateForm();
    if(Object.keys(validationError).length > 0) {
      setErrors(validationError)
    } else {
      setErrors([])
      const { db, auth } = getConfig();
      signInWithEmailAndPassword(auth, form.email, form.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          const userData = await getDoc(doc(db, 'users', user.uid))
          window.alert(`Login Successful! Welocome ${userData.data().username}`)
          router.push('/')
        })
        .catch(error => {
          window.alert(error.message)
        })
    }
  }

  return (
    <div className={styles.page}>
        <div className={styles.main}>
            <h1 className={styles.heading}>Sign In</h1>
            <input className={styles.input} type="email" name="email" id="email" placeholder='Email' onChange={handleChange} />
            <div
              className={`${styles.error} ${
                errors.email ? styles.visible : styles.hidden
              }`}
            >
              {errors.email || 'error'}
            </div>
            <input className={styles.input} type="password" name="password" id="password" placeholder='Password' onChange={handleChange} />
            <div
              className={`${styles.error} ${
                errors.password ? styles.visible : styles.hidden
              }`}
            >
              {errors.password || 'error'}
            </div>
            <Link href={''} className={styles['forgot-password']}>Forgot password?</Link>
            <button className={styles['btn-login']} onClick={handleLogin}>Login</button>
            <p className={styles['redirect-link']}>Not registered yet? Sign up <Link href={'/register'}>here</Link> now!</p>
        </div>
    </div>
  )
}
