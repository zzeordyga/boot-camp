// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6EfdA_1xK4rteGQYetBCiO5BcdClFRA8",
  authDomain: "nextjs-firebase-assignment.firebaseapp.com",
  projectId: "nextjs-firebase-assignment",
  storageBucket: "nextjs-firebase-assignment.firebasestorage.app",
  messagingSenderId: "929300710650",
  appId: "1:929300710650:web:a37fac5e596d54daf97543"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
return db;