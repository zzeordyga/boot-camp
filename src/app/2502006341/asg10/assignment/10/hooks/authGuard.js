import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getFirebase from "../../../database/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export function authGuard(){
    const mainRoute = "/2502006341/asg10/assignment/10";
    const router = useRouter();
    const [role, setRole] = useState("");
    const {db, auth} = getFirebase();

    useEffect(()=>{
        const unsuscribe = onAuthStateChanged(auth, async(user) => {
            if(user){
                const uid = user.uid;
                const docRef = doc(db, "users", uid);
                const docSnap = await getDoc(docRef);

                if(docSnap.exists){
                    setRole(docSnap.data().role);
                }
            }
            else {
                setRole("");
                router.push(`${mainRoute}/login`);
            }
        });
        return () => unsuscribe();
    }, []);

    return {role};
}