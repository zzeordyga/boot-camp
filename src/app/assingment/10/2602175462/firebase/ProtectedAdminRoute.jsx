import { db, auth } from "./Init";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProtectedAdminRoute({children}){
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async(user)=>{
            if(!user){
                router.replace("/assingment/10/2602175462/login");
                return;
            }

            try{
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if(!docSnap.exists()){
                    router.replace("/assingment/10/2602175462");
                    return;
                }

                const userData = docSnap.data();

                if(userData.role !== "admin"){
                    router.replace("/assingment/10/2602175462");
                    return;
                }

                setLoading(false);
            } catch (error){
                console.log(error);
                router.replace("/assingment/10/2602175462")
            }
        });
        return () => unsubscribe();
    }, []);

    if (loading){
        return <h2>Loading...</h2>;
    }

    return children;
}