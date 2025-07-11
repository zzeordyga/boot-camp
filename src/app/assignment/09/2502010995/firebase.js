// Import fungsi yang diperlukan dari Firebase SDK
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Ganti dengan konfigurasi Firebase proyek Anda
const firebaseConfig = {
  apiKey: "AIzaSyDsiNJWfpiFAyo3l_SYFHOW8CtJffBjptk",
  authDomain: "boot-camp-09-2502010995.firebaseapp.com",
  projectId: "boot-camp-09-2502010995",
  storageBucket: "boot-camp-09-2502010995.firebasestorage.app",
  messagingSenderId: "214024797796",
  appId: "1:214024797796:web:9e77e3334dfa51f3522971",
  measurementId: "G-WCPW1B57HC"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Cloud Firestore dan ekspor untuk digunakan di komponen lain
export const db = getFirestore(app);
