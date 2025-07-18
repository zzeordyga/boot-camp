import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCU0PNvtzsmf7ZHdUdgunn04smMVYwQs4w",
  authDomain: "assignment-10-fedb0.firebaseapp.com",
  projectId: "assignment-10-fedb0",
  storageBucket: "assignment-10-fedb0.firebasestorage.app",
  messagingSenderId: "311908706568",
  appId: "1:311908706568:web:a4c0e527c150b382e2e4bd"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
