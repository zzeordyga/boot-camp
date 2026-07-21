import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA__RS8hI0cjQM2soONAxNSaPO8Py3OOw",
  authDomain: "session-9-26fad.firebaseapp.com",
  projectId: "session-9-26fad",
  storageBucket: "session-9-26fad.firebasestorage.app",
  messagingSenderId: "791071363218",
  appId: "1:791071363218:web:f8be25dd56714d1da9564b",
  measurementId: "G-E8J24YDRHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
