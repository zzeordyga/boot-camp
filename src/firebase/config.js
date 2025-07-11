// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export default function getDb(){
    const firebaseConfig = {
    apiKey: "AIzaSyAQNEsBqQl4cgsN2xD9T7XJ9CPajceXLaQ",
    authDomain: "boot-camp-2501992343.firebaseapp.com",
    projectId: "boot-camp-2501992343",
    storageBucket: "boot-camp-2501992343.firebasestorage.app",
    messagingSenderId: "185913242041",
    appId: "1:185913242041:web:d4bc711b59b0407cb68668"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}