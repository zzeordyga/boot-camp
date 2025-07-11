import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {
  const firebaseConfig = {
    apiKey: "AIzaSyApGyhS1EQ0pN9kZOf-YJH-uP55FlNb1BY",
    authDomain: "fe-bootcamp-week9.firebaseapp.com",
    projectId: "fe-bootcamp-week9",
    storageBucket: "fe-bootcamp-week9.firebasestorage.app",
    messagingSenderId: "614215837920",
    appId: "1:614215837920:web:ecd43a6428d23bf9350885",
  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}
