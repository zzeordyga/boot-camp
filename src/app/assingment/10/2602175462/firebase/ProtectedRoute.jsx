"use client";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Init";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProtectedRoute({children}){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user) =>{
            if(!user){
                router.replace("/assingment/10/2602175462/login");
            } else {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if(loading) {
        return <h2>Loading...</h2>
    };

    return children;
}