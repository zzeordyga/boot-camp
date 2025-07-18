"use client";

import { useEffect, useState } from "react";
import getFirebase from "../_libs/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { auth, db } = getFirebase();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        setRole(userDoc.data().role);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, role, loading };
}
