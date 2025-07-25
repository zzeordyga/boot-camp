import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC9BGR-Rs3-jT0hrorsFhk_4r8gWmrok_s",
  authDomain: "case11-taskapp.firebaseapp.com",
  projectId: "case11-taskapp",
  storageBucket: "case11-taskapp.firebasestorage.app",
  messagingSenderId: "717936731762",
  appId: "1:717936731762:web:47b1b35946ba6a3782c4eb"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)