'use client'

import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import getConfig from '@/firebase/config'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
    if(!form.username) newErrors.username = 'Username is required'
    if(!form.email) newErrors.email = 'Email is required'
    if(!form.password) newErrors.password = 'Password is required'
    if(form.password !== form.confirmPassword) newErrors.confirmPassword = 'Confirm password doesn\'t match password'

    return newErrors
  }

  const handleRegister = () => {
    const validationError = validateForm();
    if(Object.keys(validationError).length > 0) {
      setErrors(validationError)
    } else {
      setErrors([])
      const { db, auth } = getConfig();
      createUserWithEmailAndPassword(auth, form.email, form.password)
        .then(async (userCredential) => {
          const user = userCredential.user;
          await setDoc(doc(db, 'users', user.uid), {
            username: form.username,
            email: form.email,
            role: 'user'
          })
          window.alert("Registration Successful")
          router.push('/login')
        })
        .catch(error => {
          window.alert(error.message)
        })
    }
  }


  return (
    <div className={styles.page}>
        <div className={styles.main}>
            <h1 className={styles.heading}>Sign Up</h1>
            <input className={styles.input} type="username" name="username" id="username" placeholder='Username' onChange={handleChange} />
            <div
              className={`${styles.error} ${
                errors.username ? styles.visible : styles.hidden
              }`}
            >
              {errors.username || 'error'}
            </div>
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
            <input className={styles.input} type="password" name="confirmPassword" id="confirmPassword" placeholder='Confirm Password' onChange={handleChange} />
            <div
              className={`${styles.error} ${
                errors.confirmPassword ? styles.visible : styles.hidden
              }`}
            >
              {errors.confirmPassword || 'error'}
            </div>
            <button className={styles['btn-login']} onClick={handleRegister}>Register</button>
            <p className={styles['redirect-link']}>Already registered? Login <Link href={'/login'}>here!</Link></p>
        </div>
    </div>
  )
}
