import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2cVdXAv4DTfWYoBcsm9BaBC04I0wARtI",
  authDomain: "sesi10-37eb6.firebaseapp.com",
  projectId: "sesi10-37eb6",
  storageBucket: "sesi10-37eb6.firebasestorage.app",
  messagingSenderId: "895704333280",
  appId: "1:895704333280:web:f5d061e0c7dc8822b08985",
  measurementId: "G-12F0Y1YPNW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
