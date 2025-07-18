// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDlyZoqdofIQnQIix_YAeuxYzn5SXowXzU",
  authDomain: "sesi10-39b9e.firebaseapp.com",
  projectId: "sesi10-39b9e",
  storageBucket: "sesi10-39b9e.firebasestorage.app",
  messagingSenderId: "775407981233",
  appId: "1:775407981233:web:9753f83a60664ae3f50890",
  measurementId: "G-2F62L8CSJ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);