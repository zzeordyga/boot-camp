import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAz_WGCaWMxoYUxwdhMFGYsd4U3Zj02hZ0",
  authDomain: "fe-bootcamp-09-4b7dd.firebaseapp.com",
  projectId: "fe-bootcamp-09-4b7dd",
  storageBucket: "fe-bootcamp-09-4b7dd.firebasestorage.app",
  messagingSenderId: "823895482538",
  appId: "1:823895482538:web:b5906937a6e172783970d3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };