import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtFhpEUJCSbZ-Cz_k15jW0JLW3iF_VObw",
  authDomain: "assignment-10-e2dc7.firebaseapp.com",
  projectId: "assignment-10-e2dc7",
  storageBucket: "assignment-10-e2dc7.firebasestorage.app",
  messagingSenderId: "123115100425",
  appId: "1:123115100425:web:e9211f737269542b369bd8",
};

export default function getFirebase() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  return { auth, db };
}
