import getConfig from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuthGuard() {
    const router = useRouter();
    const { db, auth } = getConfig();
    const [role, setRole] = useState();
    const [user, setUser] = useState();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if(user) {
                const uid = user.uid;
                const docRef = doc(db, 'users', uid);
                const docSnapshot = await getDoc(docRef);

                if(docSnapshot.exists()) {
                    const userData = docSnapshot.data();
                    setUser(userData)
                    setRole(userData.role);
                    setIsAuthenticated(true);
                } else {
                    console.log("User doesn't exist")
                }
            } else {
                setRole('guest');
                setIsAuthenticated(false)
                router.replace('/login')
            }
            setLoading(false)
        });

        return () => unsubscribe()
    }, [auth, db, router])

    return {
        isAuthenticated,
        user,
        role,
        loading
    }
}