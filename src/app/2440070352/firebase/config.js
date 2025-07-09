// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
export default function getDatabase() {

    // Your web app's Firebase configuration
    const firebaseConfig = {
    apiKey: "AIzaSyC-O6-wKxZRIiSltgQbz1bn94HZQGm9Cso",
    authDomain: "assignment-bootcamp.firebaseapp.com",
    projectId: "assignment-bootcamp",
    storageBucket: "assignment-bootcamp.firebasestorage.app",
    messagingSenderId: "971371139092",
    appId: "1:971371139092:web:c698a860f8bef41651d701"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}