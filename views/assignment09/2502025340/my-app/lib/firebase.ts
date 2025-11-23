// lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCyCtuZPinGx_krplCEpTysdt7aooiouqM",
  authDomain: "bootcamp-45dd1.firebaseapp.com",
  projectId: "bootcamp-45dd1",
  storageBucket: "bootcamp-45dd1.firebasestorage.app",
  messagingSenderId: "1069393997586",
  appId: "1:1069393997586:web:971e2f35ec4fac89fecdcb"
};

// Cegah Firebase di-init 2x
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getFirestore(app);
