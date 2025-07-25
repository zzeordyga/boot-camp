import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAokym97iYdmz1i1ep4DotexTqRrGVt7eY",
  authDomain: "fe-bootcamp-assignment-10.firebaseapp.com",
  projectId: "fe-bootcamp-assignment-10",
  storageBucket: "fe-bootcamp-assignment-10.firebasestorage.app",
  messagingSenderId: "473203136686",
  appId: "1:473203136686:web:176d106e3c35d16b59b53f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
