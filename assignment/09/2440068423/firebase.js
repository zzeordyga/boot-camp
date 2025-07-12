// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAT892WSMbofrXAcJeezIxzgfjBFtqdXlQ",
  authDomain: "assignment09-pearlazahra.firebaseapp.com",
  projectId: "assignment09-pearlazahra",
  storageBucket: "assignment09-pearlazahra.firebasestorage.app",
  messagingSenderId: "349653987293",
  appId: "1:349653987293:web:c4e7ba5dea73acaf145034",
  measurementId: "G-XY4J6TJ9NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// TEST ONLY: coba fetch data dari 'posts' collection
async function testConnection() {
  try {
    const querySnapshot = await getDocs(collection(db, 'posts'));
    console.log('Firestore connected ✅ - Posts count:', querySnapshot.size);
  } catch (error) {
    console.error('❌ Firestore connection failed:', error.message);
  }
}

testConnection(); // Panggil saat pertama

export { db };