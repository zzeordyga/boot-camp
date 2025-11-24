import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ_bvyC3AhOScz_b-K5KkNThZUx8b1Ws4",
  authDomain: "fir-sesi-10.firebaseapp.com",
  projectId: "fir-sesi-10",
  storageBucket: "fir-sesi-10.firebasestorage.app",
  messagingSenderId: "288215160294",
  appId: "1:288215160294:web:92849ea94847f393cf7227"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
