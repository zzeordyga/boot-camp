// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD0vdSt70kI7AdGh4keNSBmtT6yEkO0kLg",
  authDomain: "casesesi9.firebaseapp.com",
  projectId: "casesesi9",
  storageBucket: "casesesi9.firebasestorage.app",
  messagingSenderId: "422917189434",
  appId: "1:422917189434:web:1988368a93378d6f2b2a03"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getFirestore(app);
