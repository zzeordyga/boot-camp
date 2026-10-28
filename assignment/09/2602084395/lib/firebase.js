import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPtbccUwp0ouWL5JVZaeHI0dwCjmFTBEc",
  authDomain: "bootcamp-posts-ses9.firebaseapp.com",
  projectId: "bootcamp-posts-ses9",
  storageBucket: "bootcamp-posts-ses9.firebasestorage.app",
  messagingSenderId: "768813022284",
  appId: "1:768813022284:web:b142053282c690159dc8e9",
  measurementId: "G-HH37LR21E3",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
