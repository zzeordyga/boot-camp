"use client"

import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import getConfig from "./firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [form,  setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Form data:", form);

    try {
      const { db, auth } = getConfig();
      const userCred = await signInWithEmailAndPassword(auth,form.email,form.password);
      const uid = userCred.user.uid;

      const userDoc = await getDoc(doc(db, "Users", uid));
      const userData = userDoc.data();

      if (!userData) {
        alert("Email is not found in database");
        return;
      }

      if (userData.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/user/profile");
      }
    }

    catch (error) {
        alert(error.message);
    }
  }
  return (
    <div className="min-h-screen px-8 py-10 flex items-center justify-center">
        <div className="border border-gray-400 rounded-md shadow-md w-96 h-128 p-5">
            <h1 className="font-bold text-3xl mt-5">Login</h1>
            <p className="font-semibold mt-2">Welcome back! Please login to your account to access</p>

            <form onSubmit={handleLogin}>
                <div className="mt-5">
                    <label className="font-medium">Email</label>
                    <input type="text" className="w-full rounded-md border border-gray-400 mt-4 p-2"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                </div>

                <div className="mt-5">
                    <label className="font-medium">Password</label>
                    <input type="password" className="w-full rounded-md border border-gray-400 mt-4 p-2"  
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                </div>

                <button type="submit" className="w-full bg-purple-700 text-white font-medium py-2 px-3 mt-5 rounded-md">Login</button>
            </form>
            
            <p className="mt-2">Don't have an account click here 
              <Link href={"/register"} className="text-decoration-none text-purple-700 font-semibold ml-2">Register</Link>
                
            </p>
        </div>
    </div>
  );
}
