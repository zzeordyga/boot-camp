"use client";
import getConfig from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";


export function useAuthGuard() {
    const router = useRouter()
    const { db, auth } = getConfig()
    const [role, setRole] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid
                const docRef = doc(db, "users", uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists) {
                    const userdata = docSnap.data();
                    setRole(userdata.role);
                } else {
                    console.log("user not found")
                }
                // ...
            } else {
                setRole("guest");
                router.push('/login');
            }
            setLoading(false);
        });
        return () => unsubscribe();

    }, [auth, db, router]);

    return {
        role,
        loading,
    };
}
