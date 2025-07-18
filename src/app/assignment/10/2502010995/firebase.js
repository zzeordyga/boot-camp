// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrA-c3vWcoaBCONfC-cxELbidwPuTDfek",
  authDomain: "boot-camp-10-2502010995.firebaseapp.com",
  projectId: "boot-camp-10-2502010995",
  storageBucket: "boot-camp-10-2502010995.firebasestorage.app",
  messagingSenderId: "1075990681594",
  appId: "1:1075990681594:web:676c54a08580facf843643",
  measurementId: "G-ZBRC161P36"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);