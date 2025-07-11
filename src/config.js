// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKDquq7gqYx1Kb52NpHRnrIiQCU-LU5VE",
  authDomain: "assignment-9-170f2.firebaseapp.com",
  projectId: "assignment-9-170f2",
  storageBucket: "assignment-9-170f2.firebasestorage.app",
  messagingSenderId: "398314931061",
  appId: "1:398314931061:web:1bc9bfe2ed390aadc7893c",
  measurementId: "G-7BEM4WNJC1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  


export {db}

