"use client"

import getConfig from "../firebase/config";
import { collection, onSnapshot, doc, updateDoc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ search, setSearch ] = useState("");
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) {
            router.replace('/login');
        }
    }, [authLoading, user, router]);

    useEffect (() => {
        if (authLoading) return;

        if (!user) return;

        const { db } = getConfig();

        const checkRoleAndSubscribe = async () => {
            try {
                const currentUserDoc = await getDoc(doc(db, 'users', user.uid));
                const currentData = currentUserDoc.exists() ? currentUserDoc.data() : null;
                const role = currentData?.role || 'user';
                if (role !== 'admin') {
                    router.replace('/');
                    return;
                }

                const collRef = collection(db, "users");
                const unsubscribe = onSnapshot(
                    collRef,
                    (snapshot) => {
                        const usersList = snapshot.docs.map((d) => ({
                            id: d.id,
                            ...d.data(),
                        }));
                        setUsers(usersList);
                        setLoading(false);
                    },
                );

                
                return unsubscribe;
            } catch (err) {
                console.error(err);
            }
        };

        let unsub;
        checkRoleAndSubscribe().then((u) => { unsub = u; });

        return () => {
            if (typeof unsub === 'function') unsub();
        };
    }, [authLoading, user, router]);

    const handleRoleChange = async (targetUserId, newRole) => {
        try {
            const { db } = getConfig();
            const userRef = doc(db, 'users', targetUserId);
            await updateDoc(userRef, { role: newRole });
        } catch (err) {
            console.error('Failed to update role', err);
        }
    };

    if (authLoading || loading) {
        return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center text-center justify-center">
            <div className="w-full max-w-4xl flex justify-end items-center gap-2">
                <input type="text" placeholder="Search users..." className="border border-gray-400 w-lg px-4 py-2 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600" onClick={() => { }} >
                    Search
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th className="border border-black px-15 py-5 bg-gray-200 text-2xl">Name</th>
                        <th className="border border-black px-15 py-5 bg-gray-200 text-2xl">Email</th>
                        <th className="border border-black px-15 py-5 bg-gray-200 text-2xl">Age</th>
                        <th className="border border-black px-15 py-5 bg-gray-200 text-2xl">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users
                        .filter((u) => {
                            if (!search) return true;
                            return u.name?.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((u) => (
                            <tr key={u.id}>
                                <td className="border border-black px-15 py-5 text-xl">{u.name}</td>
                                <td className="border border-black px-15 py-5 text-xl">{u.email}</td>
                                <td className="border border-black px-15 py-5 text-xl">{u.age}</td>
                                <td className="border border-black px-15 py-5 text-xl">
                                    <select value={u.role} onChange={(e) => handleRoleChange(u.id, e.target.value)} className="border px-2 py-1 rounded-md capitalize">
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}