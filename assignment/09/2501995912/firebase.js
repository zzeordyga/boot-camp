// assignment/09/2501995912/firebase.js

// Import SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Konfigurasi Firebase (ambil dari Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyDi9xX1c3zvPFh_h8TVviDmquzoBgq7XLM",
  authDomain: "fir-posts-app-b12f2.firebaseapp.com",
  projectId: "fir-posts-app-b12f2",
  storageBucket: "fir-posts-app-b12f2.firebasestorage.app",
  messagingSenderId: "163479805698",
  appId: "1:163479805698:web:6876d238a16c32ab0a2c1b"
};

// Inisialisasi Firebase dan Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Ekspor Firestore agar bisa digunakan di file lain
export { db };
