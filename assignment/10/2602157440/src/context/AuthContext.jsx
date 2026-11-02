import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // Firebase Auth user
  const [profile, setProfile] = useState(null); // Firestore /users/{uid} doc (contains role)
  const [loading, setLoading] = useState(true);

  async function loadProfile(firebaseUser) {
    const snap = await getDoc(doc(db, "users", firebaseUser.uid));
    return snap.exists() ? snap.data() : null;
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        setUser(firebaseUser);
        try {
          setProfile(await loadProfile(firebaseUser));
        } catch (err) {
          console.error("Failed to load profile:", err);
          setProfile(null);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  // remember = true  -> LOCAL persistence (survives browser restart)
  // remember = false -> SESSION persistence (cleared when the tab closes)
  async function login(email, password, remember) {
    await setPersistence(auth, remember ? browserLocalPersistence : browserSessionPersistence);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const p = await loadProfile(cred.user);
    setProfile(p);
    return p;
  }

  async function register(name, email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: name });
    const data = {
      uid: cred.user.uid,
      name,
      email: cred.user.email,
      role: "user", // every new account starts as "user"
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", cred.user.uid), data);
    setProfile({ ...data, createdAt: new Date() });
    return data;
  }

  function logout() {
    return signOut(auth);
  }

  const value = {
    user,
    profile,
    role: profile?.role ?? null,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
