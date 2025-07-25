// Import Firebase core dan layanan yang dibutuhkan
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

// Konfigurasi Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAT892WSMbofrXAcJeezIxzgfjBFtqdXlQ",
  authDomain: "assignment09-pearlazahra.firebaseapp.com",
  projectId: "assignment09-pearlazahra",
  storageBucket: "assignment09-pearlazahra.firebasestorage.app",
  messagingSenderId: "349653987293",
  appId: "1:349653987293:web:c4e7ba5dea73acaf145034",
  measurementId: "G-XY4J6TJ9NX"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Auth & Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Set session-based persistence (login akan hilang saat tab/browser ditutup)
setPersistence(auth, browserSessionPersistence)
  .catch((error) => {
    console.error("Gagal mengatur persistence:", error);
  });

export { auth, db, collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc };
