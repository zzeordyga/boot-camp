'use client'
import React, { useActionState, useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth } from '../../firebase/Init'
import styles from "./page.module.css"
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        email:"",
        password:"",
    })

    const handleLogin = async()=>{
        const newErrors = {
            email:"",
            password:"",
        };

        let isValid = true;

        if(email === ""){
            newErrors.email = "This field must be filled";
            isValid = false;
        } else if(!email.includes('@')){
            newErrors.email = "This section must contain @ ex: example@gmail.com"
            isValid = false;
        }

        if(password === ""){
            newErrors.password = "This field must be filled";
            isValid = false;
        } 

        setErrors(newErrors);

        if(!isValid) return;

        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log(`Sign in Success`);

            router.push(`/assingment/11/2602175462`);
        } catch (error) {
            console.log(`Error ${error}`);
        }
        


    }
    

    return (
            <div className={styles.container}>
                <div className={styles.mainContainer}>
                    <h1>Login Page</h1>
                    <h3 style={{margin:'0'}}>Email</h3>
                    <input type="text" name='email' className={styles.input} value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    {errors.email &&(
                        <p className={styles.errors}>{errors.email}</p>
                    )}
                    <h3 style={{margin:'0'}}>Password</h3>
                    <input type="password" name='password' className={styles.input} value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    {errors.password &&(
                        <p className={styles.errors}>{errors.password}</p>
                    )}
                    <button className={styles.button} onClick={handleLogin}>Login</button>
                    <p>Don't have account ? <Link href='/assingment/11/2602175462/auth/register'>Go to Register Page</Link></p>
                </div>
                {/* <button onClick={goToLogin}>Go to login</button> */}
            </div>
    )
}
