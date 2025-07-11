import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyAQ0hIaPOHY3mTrse4zu6Ou4KZNlkqlJA8",
        authDomain: "fe-bootcamp-asg-09.firebaseapp.com",
        projectId: "fe-bootcamp-asg-09",
        storageBucket: "fe-bootcamp-asg-09.firebasestorage.app",
        messagingSenderId: "205258921117",
        appId: "1:205258921117:web:dc0396e3ff20a54e677074"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}