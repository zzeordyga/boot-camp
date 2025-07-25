import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDPutF5W-UHyHKMJX_KhBG_lxICSQgO4L8",
  authDomain: "bootcamp-auth-453b5.firebaseapp.com",
  projectId: "bootcamp-auth-453b5",
  storageBucket: "bootcamp-auth-453b5.firebasestorage.app",
  messagingSenderId: "75355557260",
  appId: "1:75355557260:web:abc820824dde8675669aa9"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);