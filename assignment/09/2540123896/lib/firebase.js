import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBMjGG1NWgRpjjBVzyiIIFgxtkrGsMnolY",
  authDomain: "assignment09-2d60a.firebaseapp.com",
  projectId: "assignment09-2d60a",
  storageBucket: "assignment09-2d60a.firebasestorage.app",
  messagingSenderId: "1055614187766",
  appId: "1:1055614187766:web:5685bb4e26ed6c4a6fd4d7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };