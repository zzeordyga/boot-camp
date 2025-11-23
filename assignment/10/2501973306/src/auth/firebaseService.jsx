// src/auth/firebaseService.js
import { auth, db } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc
} from "firebase/firestore";

/**
 * Register a user and store their role in Firestore
 * role should be 'user' or 'admin'
 */
export async function registerUser(email, password, role = 'user') {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid = cred.user.uid;
  await setDoc(doc(db, 'users', uid), {
    email,
    role,
    createdAt: new Date()
  });
  return cred;
}

export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred;
}

export async function logoutUser() {
  return await signOut(auth);
}

export function onAuthChanged(callback) {
  return onAuthStateChanged(auth, callback);
}

/** Get role from Firestore for given uid */
export async function getUserRole(uid) {
  if (!uid) return null;
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data().role;
}
