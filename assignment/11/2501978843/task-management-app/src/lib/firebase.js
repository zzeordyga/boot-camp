import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZ4nJ31h9UB6hYQ0h3PRAQtC7eF_EC4bg",
  authDomain: "assignment-11-a63d1.firebaseapp.com",
  projectId: "assignment-11-a63d1",
  storageBucket: "assignment-11-a63d1.firebasestorage.app",
  messagingSenderId: "869208275293",
  appId: "1:869208275293:web:05391279a8af2e4c7190b4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);