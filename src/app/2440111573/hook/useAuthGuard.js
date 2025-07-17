import getConfig from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard(){
    const router=useRouter();
    const[role, setRole] = useState("");
    const {db, auth} = getConfig();
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            
            const uid = user.uid;
            const docRef = doc(db,"account",uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setRole(docSnap.data().role);
            }
            // ...
        } else {
            setRole("guest");
            router.push("/2440111573/sesi-10/login")
            // ...
        }
        });

        return ()=> unsubscribe();

    },[])

    return{
        role,
    };
}