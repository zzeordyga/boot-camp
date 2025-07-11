import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA__xZd9LuZGN-ZTYkzW7qyu3JY7FPN6yI",
  authDomain: "fe-bootcamp-09-e7a2a.firebaseapp.com",
  projectId: "fe-bootcamp-09-e7a2a",
  storageBucket: "fe-bootcamp-09-e7a2a.firebasestorage.app",
  messagingSenderId: "44428821563",
  appId: "1:44428821563:web:4ca587a06bd3471508481e",
  measurementId: "G-TG6HJ7FQ0M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);