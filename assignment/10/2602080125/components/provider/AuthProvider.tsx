"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { authFirebase, dbFirebase } from "@/lib/firebase";

export type Role = "user" | "admin";

interface AuthContextType {
    user: User | null;
    role: Role | null;
    loading: boolean;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: React.ReactNode;
}

const ROLE_FETCH_RETRIES = 5;
const ROLE_FETCH_DELAY_MS = 500;

const AuthContext = createContext<AuthContextType | null>(null);
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchRole = async (uid: string): Promise<Role | null> => {
    for (let i = 0; i < ROLE_FETCH_RETRIES; i++) {
        try {
            const snap = await getDoc(doc(dbFirebase, "users", uid));
            if (snap.exists()) return snap.data().role as Role;
        } catch (e) {
            console.log(e)
        }
        await sleep(ROLE_FETCH_DELAY_MS);
    }
    return null;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [role, setRole] = useState<Role | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authFirebase, async (currentUser) => {
            setUser(currentUser);
            setRole(currentUser ? await fetchRole(currentUser.uid) : null);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const logout = async () => {
        await signOut(authFirebase);
    };

    return (
        <AuthContext.Provider value={{ user, role, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export { AuthProvider, useAuth };