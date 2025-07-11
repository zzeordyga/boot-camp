// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

export default function getDatabase() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAbGm0c1bMfxRVaCFeObzYtj6QmNpMT1oQ",
    authDomain: "assignment-09-b6b08.firebaseapp.com",
    projectId: "assignment-09-b6b08",
    storageBucket: "assignment-09-b6b08.firebasestorage.app",
    messagingSenderId: "65690076017",
    appId: "1:65690076017:web:e60059e4d9516aa9336cd0",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  return db;
}
