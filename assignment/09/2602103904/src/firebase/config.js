import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

export default function getDatabase() {
  const firebaseConfig = {
    apiKey: "AIzaSyA64cDI686pS9kCHImvO5pN9ZA_AhhiHjs",
    authDomain: "assignment-9-9e9d6.firebaseapp.com",
    projectId: "assignment-9-9e9d6",
    storageBucket: "assignment-9-9e9d6.firebasestorage.app",
    messagingSenderId: "943917963328",
    appId: "1:943917963328:web:7872d92300d9385b1ea7a5"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}