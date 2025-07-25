import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAuimI72Uxtlho0eZPxY9GuPNoqRQoO5As",
  authDomain: "assignment-11-cb889.firebaseapp.com",
  projectId: "assignment-11-cb889",
  storageBucket: "assignment-11-cb889.firebasestorage.app",
  messagingSenderId: "445060877275",
  appId: "1:445060877275:web:f9afa3fa4d06a4db5a75fe",
};

export default function getFirebase() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return { db };
}
