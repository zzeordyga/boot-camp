"use client"

import getConfig from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export default function Profile() {
    const [userData, setUserData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const { auth, db } = getConfig();
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid;
            const userRef = doc(db, "Users", uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
            setUserData(userSnap.data());
            } else {
            alert("User data not found!");
            }
        } else {
            router.push("/");
        }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = (e) => {
        e.preventDefault();
        const { auth } = getConfig();
        auth.signOut();
        router.push("/");
    }

     if (!userData) return <div className="text-center mt-10">Loading profile...</div>;

    return(
        <div className="min-h-screen px-8 py-10 flex items-center justify-center">
            <div className="border border-gray-400 rounded-md shadow-md w-96 p-5">
                <h1 className="text-center font-bold text-3xl">Profile</h1>

                <div className="mt-3">
                        <label className="font-medium">Name</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"  
                        value={userData.name}
                            disabled
                        />
                    </div>

                    <div className="mt-3">
                        <label className="font-medium">Email</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"
                        value={userData.email}

                            disabled
                        />
                    </div>

                    <div className="mt-3">
                        <label className="font-medium">Role</label>
                        <input type="text" className="w-full rounded-md border border-gray-400 mt-2 p-2"  
                        value={userData.role}

                            disabled
                        />
                    </div>

                    <div className="mt-10">
                        <button onClick={handleSignOut} className="w-full bg-red-700 text-white font-medium py-2 px-3 mt-5 rounded-md">Sign Out</button>

                    </div>
            </div>
        </div>
    )
}