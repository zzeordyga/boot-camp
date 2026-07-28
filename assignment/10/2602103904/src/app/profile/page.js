"use client"

import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import getConfig from "../firebase/config";
import { doc, onSnapshot, collection, deleteDoc } from "firebase/firestore";
import { deleteUser, signOut } from "firebase/auth";
import ProtectedRoute from "../components/ProtectedRoute";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { db, auth } = getConfig();
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [ isModalOpen, setIsModalOpen ] = useState(false);
    const [ currentUserData, setCurrentUserData ] = useState(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isModalOpen]);

    useEffect(() => {
        if (!user && !authLoading) {
            router.replace('/login');
            return;
        }

        if (!user) {
            setCurrentUserData(null);
            setLoading(true);
            return;
        }

        const userDocRef = doc(db, "users", user.uid);

        const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
            if (snapshot.exists()) {
                setCurrentUserData({ id: snapshot.id, ...snapshot.data() });
            } else {
                setCurrentUserData(null);
            }
            setLoading(false);
        }, (error) => {
            console.error("Error fetching user data: ", error);
            setLoading(false);
        });

        return unsubscribe;
    }, [db, user, authLoading, router]);

    if (authLoading || loading) return <p className="flex min-h-screen items-center justify-center">Loading User Data...</p>

    if (!currentUserData) return <p className="flex min-h-screen items-center justify-center">No profile data found.</p>

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace('/login');
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    const handleDeleteAccount = async () => {
        if (!user) return;

        try {
            await deleteDoc(doc(db, "users", user.uid));
            await deleteUser(user);
            router.replace('/login');
        } catch (error) {
            console.error('Delete failed', error);
        }
    };

    return (
        <ProtectedRoute> 
            <div className="min-h-screen flex items-center justify-center text-center">
                <div className="w-full max-w-2xl bg-gray-200 px-10 py-5 rounded-lg shadow-md">
                    <div className="space-y-5">
                        <div className="flex justify-between items-center">
                            <div className="text-3xl font-bold flex gap-4 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1m3.663-5.113Q8.5 10.976 8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13t-2.488-1.012M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"/>
                                </svg>
                                {currentUserData.name || "User"}
                            </div>
                            <div className="px-6 py-3 bg-blue-600 rounded-full text-xl text-white capitalize">{currentUserData.role || "User"}</div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"/>
                            </svg>
                            <div className="text-2xl font-semibold">Email: {currentUserData.email || "-"}</div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M9.175 10.825Q8 9.65 8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12t-2.825-1.175M4 20v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"/>
                            </svg>
                            <div className="text-2xl font-semibold">Age: {currentUserData.age || "-"}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mt-10 justify-center">
                        <button type="button" onClick={() => setIsModalOpen(true)} className="rounded-full cursor-pointer px-5 py-3 bg-red-600 text-white text-xl font-bold hover:bg-red-800">Delete Account</button>
                        <button type="button" onClick={handleLogout} className="rounded-full cursor-pointer px-5 py-3 bg-blue-600 text-white text-xl font-bold hover:bg-blue-800">Log Out</button>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleDeleteAccount} title="Delete your account?">
                        <p className="text-md">Are you sure you want to delete your account? This action can&apos;t be undone.</p>
                    </Modal>
                </div>
            </div>
        </ProtectedRoute>
    )
}