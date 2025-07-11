// assignment/09/2540118851/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAGM_AUY5Rq0Ye6zomrae8rcP7UJVq6FwQ",
  authDomain: "bootcamp-s9.firebaseapp.com",
  projectId: "bootcamp-s9",
  storageBucket: "bootcamp-s9.appspot.com", // Perbaiki dari `.app` ke `.appspot.com`
  messagingSenderId: "20791881028",
  appId: "1:20791881028:web:d1bd7c328b4fd748c1bb11"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
