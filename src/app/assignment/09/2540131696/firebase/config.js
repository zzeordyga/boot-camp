
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 


const firebaseConfig = {
  apiKey: "AIzaSyDC1dekkbJ4obN4XLaT_7w5fOkO7mJKmY",
  authDomain: "bootcamp-asg-9.firebaseapp.com",
  projectId: "bootcamp-asg-9",
  storageBucket: "bootcamp-asg-9.firebasestorage.app",
  messagingSenderId: "571770889219",
  appId: "1:571770889219:web:7f9b937c16fbb06a60da36",
  measurementId: "G-QF69T4W02Y"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);