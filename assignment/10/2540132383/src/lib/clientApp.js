// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBTPkaWMsGfkzG0lIf6REMcsoLmRet8Aqg",
    authDomain: "session10-assignment.firebaseapp.com",
    projectId: "session10-assignment",
    storageBucket: "session10-assignment.firebasestorage.app",
    messagingSenderId: "8951200890",
    appId: "1:8951200890:web:204b3860bc2febd3940fc3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const base = {
    db, auth
};

export default base;