// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore }   from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4eUdRJHfQTRRCU3x5AVM59_1hwNdJ1Y0",
  authDomain: "assignment-9-d4282.firebaseapp.com",
  projectId: "assignment-9-d4282",
  storageBucket: "assignment-9-d4282.firebasestorage.app",
  messagingSenderId: "76515353381",
  appId: "1:76515353381:web:630f70556408ff34f6b0cc",
  measurementId: "G-45YPLL8CXH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
