// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx2OjD90Eubse4S0K-rRqWh51vr0ytT8I",
    authDomain: "session11-assignment.firebaseapp.com",
    projectId: "session11-assignment",
    storageBucket: "session11-assignment.firebasestorage.app",
    messagingSenderId: "985851734490",
    appId: "1:985851734490:web:32921e37c56ce1d20778e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };