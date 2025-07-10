import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Y4AFDeQqHMqDTG30Z3V0oTzB2Jj4xW8",
  authDomain: "sesi-9-c875a.firebaseapp.com",
  projectId: "sesi-9-c875a",
  storageBucket: "sesi-9-c875a.firebasestorage.app",
  messagingSenderId: "953505114223",
  appId: "1:953505114223:web:f02ceebeeefc4b0ba9c59a",
  measurementId: "G-8FZG7G4GS2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };