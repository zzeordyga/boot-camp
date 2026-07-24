import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1cq-ECytUMnHxX0dROD1BRBHGQAGO9Ns",
  authDomain: "it-bootcamp-binus.firebaseapp.com",
  projectId: "it-bootcamp-binus",
  storageBucket: "it-bootcamp-binus.firebasestorage.app",
  messagingSenderId: "1006657686560",
  appId: "1:1006657686560:web:47aad879046f4b57974045",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
