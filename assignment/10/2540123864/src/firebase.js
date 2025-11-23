// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfkZtO7WCaBWzjo1AOObJ3InEhr827_nQ",
  authDomain: "casesesi10.firebaseapp.com",
  projectId: "casesesi10",
  storageBucket: "casesesi10.firebasestorage.app",
  messagingSenderId: "997629008582",
  appId: "1:997629008582:web:5dab4625d0ec515678d5c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);