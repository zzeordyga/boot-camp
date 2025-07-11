import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyA4e9fxb8x2aIMlCNMm7DJhrgWRc1kwpCM",
        authDomain: "fe-assignment09.firebaseapp.com",
        projectId: "fe-assignment09",
        storageBucket: "fe-assignment09.firebasestorage.app",
        messagingSenderId: "827911850420",
        appId: "1:827911850420:web:d0b667eb39ee0942fb8ae1"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}