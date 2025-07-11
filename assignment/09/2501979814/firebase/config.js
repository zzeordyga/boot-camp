import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';


export default function getDatabase() {
  const firebaseConfig = {
    apiKey: "AIzaSyB9zZJse-7DjXJZzYCiY260pN9zzrc09w4",
    authDomain: "assignment-fe-bootcamp.firebaseapp.com",
    projectId: "assignment-fe-bootcamp",
    storageBucket: "assignment-fe-bootcamp.firebasestorage.app",
    messagingSenderId: "618565919921",
    appId: "1:618565919921:web:49ba769f2f4140f848ee90",
    measurementId: "G-4DJDFMR2V2"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);;
  return db;
}
