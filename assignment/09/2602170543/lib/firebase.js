import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhxzKr4iclCPaQdDcunFJhjycihofl80A",
  authDomain: "sesi9-667dc.firebaseapp.com",
  projectId: "sesi9-667dc",
  storageBucket: "sesi9-667dc.firebasestorage.app",
  messagingSenderId: "631544445122",
  appId: "1:631544445122:web:e5e1ed89da76af4927a35b",
  measurementId: "G-2YKS2JVFJK",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
