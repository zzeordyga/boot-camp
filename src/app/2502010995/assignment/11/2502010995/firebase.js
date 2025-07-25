// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4PZ0076plSN3UdBb-reIqz9jAqvYQh8c",
  authDomain: "bootcamp-11-2502010995.firebaseapp.com",
  projectId: "bootcamp-11-2502010995",
  storageBucket: "bootcamp-11-2502010995.firebasestorage.app",
  messagingSenderId: "906498709744",
  appId: "1:906498709744:web:6a138a06fc75101a900a35",
  measurementId: "G-ZQS8S3TCZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);