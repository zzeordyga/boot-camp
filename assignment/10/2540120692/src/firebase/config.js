import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyAyJ_NMUMqgYaaJ77PuoT8EFi_CSjFXJBE",
    authDomain: "fe-bootcamp-09-d1bc4.firebaseapp.com",
    projectId: "fe-bootcamp-09-d1bc4",
    storageBucket: "fe-bootcamp-09-d1bc4.firebasestorage.app",
    messagingSenderId: "425391117374",
    appId: "1:425391117374:web:9445ff3eb5b624c69bad6f"
  };
}

export default function getConfig() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    db,
    auth
  };
}
