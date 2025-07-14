// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBSBpShVHbh8Pz3al8yme6TgT2WxbsuUk",
  authDomain: "assignment10-582f9.firebaseapp.com",
  projectId: "assignment10-582f9",
  storageBucket: "assignment10-582f9.firebasestorage.app",
  messagingSenderId: "954221828513",
  appId: "1:954221828513:web:548f0611622a71f22693e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};