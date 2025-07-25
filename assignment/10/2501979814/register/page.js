"use client"

import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import getConfig from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";


export default function Register() {
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        role: "",
        email: "",
        password: "",
    });

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Form data:", form);

        try {
            const { db, auth } = getConfig();
            const userCred = await createUserWithEmailAndPassword(auth, form.email, form.password);
            const uid = userCred.user.uid;

            await setDoc(doc(db, "Users", uid), {
                name: form.name,
                role: form.role,
                email: form.email,
            });

            router.push("/");
        }

        catch (error) {
            alert(error.message);
        }

    }

    return (
        <div className="min-h-screen px-8 py-10 flex items-center justify-center">
            <div className="border border-gray-400 rounded-md shadow-md w-96 p-5">
                <h1 className="font-bold text-3xl mt-5">Register</h1>

                <form onSubmit={handleRegister}>
                    <div className="mt-5">
                        <label className="font-medium">Name</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value})}
                        />
                    </div>
                    <div className="mt-3">
                        <label className="font-medium">Role</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"  
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value})}
                        />
                    </div>
                    
                    <div className="mt-3">
                        <label className="font-medium">Email</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"  
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value})}
                        />
                    </div>

                    <div className="mt-3">
                        <label className="font-medium">Password</label>
                        <input type="password" className="w-full rounded-md border border-gray-400 mt-2 p-2"  
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value})}
                        />
                    </div>
                    <div className="mt-10 mb-5">
                        <button type="submit" className="w-full bg-purple-700 text-white font-medium py-2 px-3 rounded-md">Register</button>
                        
                    </div>
                </form>
                
              
            </div>
       </div>
    )
}