// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMSXNjLVtFrFrpWRpg1dCld_3Cd4vWWZc",
  authDomain: "boot-camp-791f7.firebaseapp.com",
  projectId: "boot-camp-791f7",
  storageBucket: "boot-camp-791f7.firebasestorage.app",
  messagingSenderId: "502668667560",
  appId: "1:502668667560:web:ce7d37982f404bbc4c709d",
  measurementId: "G-X3XPD10BQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);