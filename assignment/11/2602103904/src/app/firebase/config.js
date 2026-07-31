import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig () {
    return {
        apiKey: "AIzaSyBJ-HKPW2sODSqSIsPdPwNATS7cY0_Qck0",
        authDomain: "assignment-11-eb80c.firebaseapp.com",
        projectId: "assignment-11-eb80c",
        storageBucket: "assignment-11-eb80c.firebasestorage.app",
        messagingSenderId: "594344162029",
        appId: "1:594344162029:web:1bea761cfd9e27c1b152e4"
    };
};

export default function getConfig() {
    const firebaseConfig = getFirebaseConfig();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    return { db, app };
}