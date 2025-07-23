// src/utils/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // jika pakai Storage

const firebaseConfig = {
    apiKey: "AIzaSyA884RyE_5xRHuaZT8EfiE2KJKj0jZe6zE",
    authDomain: "project-assignment-bootcamp.firebaseapp.com",
    projectId: "project-assignment-bootcamp",
    storageBucket: "project-assignment-bootcamp.firebasestorage.app",
    messagingSenderId: "1076954120316",
    appId: "1:1076954120316:web:81e03370e78803836589f9"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
// const storage = getStorage(app);

export { app, auth, db };