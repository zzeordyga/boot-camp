import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyC62JqmsPg05K9XwvN1klhWsmj-ulzKvYU",
    authDomain: "session-9-39256.firebaseapp.com",
    projectId: "session-9-39256",
    storageBucket: "session-9-39256.firebasestorage.app",
    messagingSenderId: "831759635290",
    appId: "1:831759635290:web:f26570e0a0aedfe7455963",
    measurementId: "G-57YVHJLZ4E"
  };
}

export default function getConfig(){
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  return {
    db,
    auth
  };
}


