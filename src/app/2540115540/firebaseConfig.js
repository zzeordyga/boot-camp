import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAnaGxQ7YfppxUmA-2VdRBdPITTmmIvEiA",
  authDomain: "project-ed6c9.firebaseapp.com",
  projectId: "project-ed6c9",
  storageBucket: "project-ed6c9.firebasestorage.app",
  messagingSenderId: "962441629626",
  appId: "1:962441629626:web:39c24243c7221fc4429783",
  measurementId: "G-V49CNQ7GZW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
