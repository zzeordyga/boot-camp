// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoNwyASyMTz_Cwx30-RwTz7i0KQFbmCcg",
  authDomain: "sesi10asg.firebaseapp.com",
  projectId: "sesi10asg",
  storageBucket: "sesi10asg.firebasestorage.app",
  messagingSenderId: "202116788736",
  appId: "1:202116788736:web:acfa0853dcb9911fb05ee5",
  measurementId: "G-HEXSXW9TVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };