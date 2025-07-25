import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2VLERVpMtyojXNeM6o5reSB_a9-5y604",
  authDomain: "assignment-11-d69f3.firebaseapp.com",
  projectId: "assignment-11-d69f3",
  storageBucket: "assignment-11-d69f3.firebasestorage.app",
  messagingSenderId: "655138837212",
  appId: "1:655138837212:web:bb57bad95cee25fd549a19"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);