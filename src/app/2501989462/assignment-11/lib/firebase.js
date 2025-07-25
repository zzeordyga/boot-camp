import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBY6DbkawzHJGWHtK10SvWKBXAttgjpyE8",
  authDomain: "fe-bootcamp-11.firebaseapp.com",
  projectId: "fe-bootcamp-11",
  storageBucket: "fe-bootcamp-11.firebasestorage.app",
  messagingSenderId: "99787989982",
  appId: "1:99787989982:web:d6b2a956b22c78ffea334f",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
