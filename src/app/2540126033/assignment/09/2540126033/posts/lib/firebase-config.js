// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "sesi9asg.firebaseapp.com",
  projectId: "sesi9asg",
  storageBucket: "sesi9asg.firebasestorage.app",
  messagingSenderId: "44957831278",
  appId: "1:44957831278:web:8feac794e86e30042ad67f",
  measurementId: "G-CGQ5E2J6ZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}