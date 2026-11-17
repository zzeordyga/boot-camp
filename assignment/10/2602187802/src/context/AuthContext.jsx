"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubRole = () => {};
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      unsubRole();
      setUser(u);
      if (!u) {
        setRole(null);
        setUsername(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      unsubRole = onSnapshot(
        doc(db, "users", u.uid),
        (snap) => {
          const data = snap.exists() ? snap.data() : null;
          setRole(data?.role ?? null);
          setUsername(data?.username ?? null);
          setLoading(false);
        },
        () => setLoading(false)
      );
    });
    return () => {
      unsubAuth();
      unsubRole();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, username, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
