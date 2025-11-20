import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtlVhLLPqUV8Uy0Sw7QtBtZoHbtEgmbkE",
  authDomain: "session8-assignment.firebaseapp.com",
  projectId: "session8-assignment",
  storageBucket: "session8-assignment.firebasestorage.app",
  messagingSenderId: "446918381264",
  appId: "1:446918381264:web:a7b685ed71316c3be858d5",
  measurementId: "G-N60HYPQ1M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore
export const db = getFirestore(app);
