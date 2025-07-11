import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyALb9HswABf_6gxH6Abdwd0EpPPkpr2uco",
  authDomain: "bootcamp-app-f3bd4.firebaseapp.com",
  projectId: "bootcamp-app-f3bd4",
  storageBucket: "bootcamp-app-f3bd4.firebasestorage.app",
  messagingSenderId: "219813783500",
  appId: "1:219813783500:web:d54e033dd4fc6ba7519f69",
  measurementId: "G-9CT350X957",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
