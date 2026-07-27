// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBzXFGNJj1dws5ggLUAxBiqm7L6loGjBSg",
    authDomain: "session10-62e41.firebaseapp.com",
    projectId: "session10-62e41",
    storageBucket: "session10-62e41.firebasestorage.app",
    messagingSenderId: "976099065655",
    appId: "1:976099065655:web:36e28d4fc97d9d792b64b2",
    measurementId: "G-D0CLD683RZ"
};

import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };