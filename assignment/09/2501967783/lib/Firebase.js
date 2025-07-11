import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBe-sgySVpoxrWGzYwzVr-dOBEGvXi--BM",
  authDomain: "boot-camp-assignment.firebaseapp.com",
  projectId: "boot-camp-assignment",
  storageBucket: "boot-camp-assignment.firebasestorage.app",
  messagingSenderId: "357170868517",
  appId: "1:357170868517:web:0abcab4b82fa40b665eacc"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };