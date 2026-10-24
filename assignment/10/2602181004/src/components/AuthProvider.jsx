'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { subscribeToProfile } from '@/lib/users';

const AuthContext = createContext(null);

const guestState = { status: 'guest', user: null, profile: null, error: null };

export function AuthProvider({ children }) {
  const [state, setState] = useState({ ...guestState, status: 'loading' });
  const stopProfile = useRef(() => {});

  useEffect(() => {
    if (!auth) {
      setState(guestState);
      return undefined;
    }
    const stopAuth = onAuthStateChanged(
      auth,
      (user) => {
        stopProfile.current();
        stopProfile.current = () => {};
        if (!user) {
          setState(guestState);
          return;
        }
        setState({ status: 'loading', user, profile: null, error: null });
        stopProfile.current = subscribeToProfile(
          user.uid,
          (profile) => setState({ status: 'ready', user, profile, error: null }),
          (error) => setState({ status: 'ready', user, profile: null, error }),
        );
      },
      (error) => setState({ ...guestState, error }),
    );
    return () => {
      stopAuth();
      stopProfile.current();
    };
  }, []);

  const logout = async () => {
    stopProfile.current();
    stopProfile.current = () => {};
    await signOut(auth);
  };

  return <AuthContext.Provider value={{ ...state, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
