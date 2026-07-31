import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

function getFirebaseConfig() {
    return {
        apiKey: "AIzaSyBPf_i9feD-L-4B_CDI9drgiG1uNOvlAkA",
        authDomain: "assignment-10-99ba9.firebaseapp.com",
        projectId: "assignment-10-99ba9",
        storageBucket: "assignment-10-99ba9.firebasestorage.app",
        messagingSenderId: "90022918027",
        appId: "1:90022918027:web:fb0d2a6d1b52f68bfe618e"
    };
}

export default function getConfig() {
    const firebaseConfig = getFirebaseConfig();
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth(app);

    return { db, auth, app };
}