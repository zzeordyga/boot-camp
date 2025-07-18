// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// 👉 Import config dari file TIDAK di-push ke GitHub
import { firebaseConfig } from './firebaseConfig.js';

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Export agar bisa digunakan di file lain
export const auth = getAuth(app);
export const db = getFirestore(app);