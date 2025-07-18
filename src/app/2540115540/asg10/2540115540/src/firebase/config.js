import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANNt5qtScwG2o9yVcQxhK6HpLBGtCa9w8",
  authDomain: "asg10-71800.firebaseapp.com",
  projectId: "asg10-71800",
  storageBucket: "asg10-71800.firebasestorage.app",
  messagingSenderId: "913572262583",
  appId: "1:913572262583:web:f7ac343fea36b30e4ad332"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
