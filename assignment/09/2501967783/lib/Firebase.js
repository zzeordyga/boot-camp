// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAwnFNyP8auvtFZO2HEem3GVQbKKZvBeJI",
  authDomain: "boot-camp-683bf.firebaseapp.com",
  projectId: "boot-camp-683bf",
  storageBucket: "boot-camp-683bf.firebasestorage.app",
  messagingSenderId: "1061688111432",
  appId: "1:1061688111432:web:4dd145add9c63f4e10c37d",
  measurementId: "G-NB66RCVX4N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);