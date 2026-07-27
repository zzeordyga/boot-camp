"use client";

import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "./firebase";
import { useRouter, usePathname } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";

export default function RootAuthLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isChecking, setIsCheking] = useState(true);


    useEffect(() => {
        const unsubs = onAuthStateChanged(auth, async (currentUser) => {
            const isLoginPage = pathname.includes('/login');
            if (!currentUser) {
                if (!isLoginPage) {
                    router.push('/assignment/10/2602209223/login');
                } else {
                    setIsCheking(false);
                }
            } else {
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                if (userDoc.exists()) {
                    const role = userDoc.data().role;
                    if (isLoginPage) {
                        if (role === 'admin') {
                            router.push('/assignment/10/2602209223/admin/dashboard');
                        } else {
                            router.push('/assignment/10/2602209223/user/profile');
                        }
                    }
                    else {
                        if (pathname.includes('/admin') && role !== 'admin') {
                            router.push('/assignment/10/2602209223/user/profile');
                        } else if (pathname.includes('/user/profile') && role === 'admin') {
                            router.push('/assignment/10/2602209223/admin/dashboard');
                        }
                    }
                    setIsCheking(false);
                }
                else {
                    alert("Peringatan: Akun berhasil login di Firebase Auth, tapi TIDAK ADA data di Firestore koleksi 'users' dengan UID ini!");
                    setIsCheking(false);
                }
            }
        });
        return () => {
            unsubs();
        }
    }, [pathname, router]);
    if (isChecking) {
        return <div style={{ padding: "20px" }}>
            loading ....
        </div>
    }
    return <>{children}</>
}