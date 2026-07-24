import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyARWFHazBMW-67Gukoc-js8JusNYUQhLvw",
  authDomain: "it-bootcamp-binus-11.firebaseapp.com",
  projectId: "it-bootcamp-binus-11",
  storageBucket: "it-bootcamp-binus-11.firebasestorage.app",
  messagingSenderId: "904652248113",
  appId: "1:904652248113:web:9e1ab06a46a30dfd84b110",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
