// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZhfYWTzTdkO8S8NLeagCd3-x5WiaPKNM",
  authDomain: "bootcamp-proj9.firebaseapp.com",
  projectId: "bootcamp-proj9",
  storageBucket: "bootcamp-proj9.appspot.com",
  messagingSenderId: "464391496253",
  appId: "1:464391496253:web:8b59f3132753e0bd8a5b44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
