'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [profile, setProfile] = useState(null); // Firestore users/{uid} doc (contains role)
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (firebaseUser) => {
    if (!firebaseUser) {
      setProfile(null);
      return;
    }
    try {
      const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
      setProfile(snap.exists() ? snap.data() : null);
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      await fetchProfile(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, [fetchProfile]);

  // Call after registration, because the Firestore doc is written after the auth state changes
  const refreshProfile = useCallback(async () => {
    await fetchProfile(auth.currentUser);
  }, [fetchProfile]);

  const logout = useCallback(() => signOut(auth), []);

  const value = {
    user,
    profile,
    role: profile?.role ?? null,
    loading,
    refreshProfile,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
