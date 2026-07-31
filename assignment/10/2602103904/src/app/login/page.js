"use client"
import { useState } from "react"
import getConfig from "../firebase/config"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

export default function LoginPage() {
    const router = useRouter()
    const [ form, setForm ] = useState({
        email: "",
        password: "",
    });
    const [ errors, setErrors ] = useState({});

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    const validate = () => {
        const newErrorss = {};
        if (!form.email) newErrorss.email = "Email is required"
        if (!form.password) newErrorss.password = "Password is required"

        return newErrorss;
    };

    const handleLogin = async () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const { auth, db } = getConfig();
            const userCredential = await signInWithEmailAndPassword(auth, form.email, form.password);
            const firebaseUser = userCredential.user;

            try {
                const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
                const role = userDoc.exists() ? userDoc.data().role : 'user';
                if (role === 'admin') {
                    router.push('/admin');
                } else {
                    router.push('/profile');
                }
            } catch (fetchErr) {
                console.error('Failed to fetch user role', fetchErr);
                router.push('/profile');
            }
        } catch (error) {
            setErrors({
                general: error.message || "Login failed"
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-10">
            <div className="w-screen max-w-xl rounded-md bg-gray-100 border border-gray-600">
                <div className="text-3xl font-bold border-b p-5 text-center">
                    Login
                </div>
                <div className="p-10">
                    <div>
                        <p className="text-lg font-semibold mb-2">Email</p>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Input your email" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.email && (<div className="text-red-800 mt-2">{errors.email}!</div>)}
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-semibold mb-2">Password</p>
                        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Input your password" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.password && (<div className="text-red-800 mt-2">{errors.password}!</div>)}
                    </div>
                    {errors.general && <div className="text-red-800 mt-5 bg-red-200 p-3 text-center font-semibold">Email or password is incorrect</div>}
                    <button type="button" onClick={handleLogin} className="w-full rounded-lg bg-blue-400 py-3 mt-10 font-bold text-xl cursor-pointer hover:bg-blue-500">
                        Confirm
                    </button>
                    <div className="text-md mt-4 font-semibold">
                        Don&apos;t have an account? <Link href="/register" className="border-b border-blue-600 text-blue-600 hover:text-blue-800">Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}