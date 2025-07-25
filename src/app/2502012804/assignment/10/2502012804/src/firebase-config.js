import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs8Fd_GIjCXP02iSAZkK_S8L-Pm8A3DKo",
  authDomain: "assignment-10-131c4.firebaseapp.com",
  projectId: "assignment-10-131c4",
  storageBucket: "assignment-10-131c4.firebasestorage.app",
  messagingSenderId: "250967721473",
  appId: "1:250967721473:web:f809d0801dca069ca52200",
  measurementId: "G-LRWX2CZBVK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);