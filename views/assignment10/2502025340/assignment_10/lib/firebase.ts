import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRJhduWbsqfZ03MJWe4yMG5IHJliB0QQQ",
  authDomain: "assignment-548c6.firebaseapp.com",
  projectId: "assignment-548c6",
  storageBucket: "assignment-548c6.firebasestorage.app",
  messagingSenderId: "526420956288",
  appId: "1:526420956288:web:4faee34cd874a70361c265"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
