// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function getDatabase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDkPoss48VlVPcy7U8enx_-Rk8lbqAIxcU",
    authDomain: "boot-camp-09.firebaseapp.com",
    projectId: "boot-camp-09",
    storageBucket: "boot-camp-09.firebasestorage.app",
    messagingSenderId: "659059849624",
    appId: "1:659059849624:web:e6d382da2613f5749893ed",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  return db;
}
