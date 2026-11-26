import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyVgsLaeUIT_mmjUHkE1yaq4ZcG6wzCrQ",
  authDomain: "bootcamp-assignment-9.firebaseapp.com",
  projectId: "bootcamp-assignment-9",
  storageBucket: "bootcamp-assignment-9.firebasestorage.app",
  messagingSenderId: "782096631874",
  appId: "1:782096631874:web:4e4281cef36f021b9c5db",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);