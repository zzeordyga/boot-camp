// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3ZpnkHBtR4EsgfsQdvmdJ-MgCMy2ZNlk",
  authDomain: "case10-auth.firebaseapp.com",
  projectId: "case10-auth",
  storageBucket: "case10-auth.firebasestorage.app",
  messagingSenderId: "49557189802",
  appId: "1:49557189802:web:f406bc458541cbd7bb4cd3",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);