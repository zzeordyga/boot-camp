import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOH3mbYJfCgDmKRYC3BqtuhrTWieR8fbc",
  authDomain: "it-bootcamp-binus-10.firebaseapp.com",
  projectId: "it-bootcamp-binus-10",
  storageBucket: "it-bootcamp-binus-10.firebasestorage.app",
  messagingSenderId: "142047362970",
  appId: "1:142047362970:web:d1dd9aceb9be85b5e70423",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
