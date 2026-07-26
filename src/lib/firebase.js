import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBsrUIbzm__cIycoj_601Jy3LA3spF72s8",
  authDomain: "boot-camp-2602096716.firebaseapp.com",
  projectId: "boot-camp-2602096716",
  storageBucket: "boot-camp-2602096716.firebasestorage.app",
  messagingSenderId: "273310604930",
  appId: "1:273310604930:web:056fa5d4d8b37184b59e9b"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth };