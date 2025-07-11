import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDB(){
    const firebaseConfig = {
    apiKey: "AIzaSyBqsWA_gr7lYMbgBT3ssJN83IbZL2EfXsw",
    authDomain: "fe-bootcamp-dd9e9.firebaseapp.com",
    projectId: "fe-bootcamp-dd9e9",
    storageBucket: "fe-bootcamp-dd9e9.firebasestorage.app",
    messagingSenderId: "987229296566",
    appId: "1:987229296566:web:91984057494011f9341317"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return db;
}