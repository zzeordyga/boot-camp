import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {

    const firebaseConfig = {
        apiKey: "AIzaSyAQ10ePehlgvUUuMWzTksOAa2pL_KAIynM",
        authDomain: "fe-bootcamp-ses09.firebaseapp.com",
        projectId: "fe-bootcamp-ses09",
        storageBucket: "fe-bootcamp-ses09.firebasestorage.app",
        messagingSenderId: "966457576422",
        appId: "1:966457576422:web:8cbfacc99e9036e08a6427"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}

