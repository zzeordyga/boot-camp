'use client';

import React, { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk pendaftaran
  async function signup(email, password) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Simpan role default 'user' ke Firestore saat pendaftaran
    await setDoc(doc(db, "users", userCredential.user.uid), {
      email: email,
      role: "user"
    });
    return userCredential;
  }

  // Fungsi untuk login
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Fungsi untuk logout
  function logout() {
    return signOut(auth);
  }

  // Efek untuk memantau perubahan status login
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Jika user login, ambil rolenya dari Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userRole,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
