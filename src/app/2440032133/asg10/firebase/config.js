import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDcexqVu04Sg-4a9nOv8nhqbd_S8kR817Q",
  authDomain: "teslagi-46513.firebaseapp.com",
  projectId: "teslagi-46513",
  storageBucket: "teslagi-46513.firebasestorage.app",
  messagingSenderId: "235166755521",
  appId: "1:235166755521:web:a92908cf4674c47af90240",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);