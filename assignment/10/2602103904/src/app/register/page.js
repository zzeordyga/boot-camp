"use client"
import { useState } from "react"
import getConfig from "../firebase/config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
    const router = useRouter();
    const [ submit, setSubmit ] = useState(false)
    const [ age, setAge ] = useState("")
    const [ form, setForm ] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        age: "",
    });
    const [ errors, setErrors ] = useState({});

    const handleChange = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value,
        });
    }

    const validate = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = "Name is required"
        if (!form.email) {
            newErrors.email = "Email is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = "Invalid Email"
        }
        if (!form.password) newErrors.password = "Password is required"
        if (!form.confirmPassword) {
            newErrors.confirmPassword = "Confirm Password is required"
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = "Invalid Confirm Password"
        }
        if (!form.age) newErrors.age = "Age is required"

        return newErrors;
    };

    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case "auth/invalid-email":
                return "Invalid Email";
            case "auth/email-already-in-use":
                return "Email has been used";
            case "auth/weak-password":
                return "Password is too weak";
            case "auth/network-request-failed":
                return "Network error. Please try again.";
            default:
                return "Registration failed. Please try again.";
        }
    };

    const handleRegister = async () => {
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            const { db, auth } = getConfig();
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: form.name,
                email: form.email,
                age: form.age,
                role: "user"
            });

            setSubmit(true);
            router.push("/profile");
        } catch (error) {
            const friendlyMessage = getFriendlyErrorMessage(error.code);
            setErrors({
                general: friendlyMessage,
                ...(error.code === "auth/invalid-email" ? { email: "Invalid Email" } : {}),
                ...(error.code === "auth/email-already-in-use" ? { email: "Email has been used" } : {}),
                ...(error.code === "auth/weak-password" ? { password: "Password is too weak" } : {})
            });
        }
    }

    const handleAgeChange = (e) => {
        const value = e.target.value

        if (value === "") {
            setAge("")
            setForm({
                ...form,
                age: "",
            })
            return
        }
        
        const num = Number(value)
        const ageValue = num < 0 ? "0" : String(num)

        setAge(ageValue)
        setForm({
            ...form,
            age: ageValue,
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-10">
            <div className="w-screen max-w-xl rounded-md bg-gray-100 border border-gray-600">
                <div className="text-3xl font-bold border-b p-5 text-center">
                    Register
                </div>
                <div className="p-10">
                    <div>
                        <p className="text-lg font-semibold mb-2">Name</p>
                        <input type="text" name="name" onChange={handleChange} placeholder="Input your name" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.name && (<div className="text-red-800 mt-2">{errors.name}!</div>)}
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-semibold mb-2">Email</p>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Input your email" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.email && (<div className="text-red-800 mt-2">{errors.email}!</div>)}
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-semibold mb-2">Password</p>
                        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Input your password" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.password && (<div className="text-red-800 mt-2">{errors.password}!</div>)}
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-semibold mb-2">Confirm Password</p>
                        <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Confirm your password" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.confirmPassword && (<div className="text-red-800 mt-2">{errors.confirmPassword}!</div>)}
                    </div>
                    <div className="mt-5">
                        <p className="text-lg font-semibold mb-2">Age</p>
                        <input type="number" name="age" min="0" value={age} onChange={handleAgeChange} placeholder="0" className="border border-gray-400 rounded-md px-4 py-2 text-md w-full" />
                        {errors.age && (<div className="text-red-800 mt-2">{errors.age}!</div>)}
                    </div>
                    {errors.general && (<div className="text-red-800 mt-5 bg-red-200 p-3 text-center font-semibold">{errors.general}</div>)}
                    <button type="button" onClick={handleRegister} className="w-full rounded-lg bg-blue-400 py-3 mt-10 font-bold text-xl cursor-pointer hover:bg-blue-500">
                        Confirm
                    </button>
                    {submit}
                </div>
            </div>
        </div>
    )
}