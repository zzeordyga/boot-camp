import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {
  const firebaseConfig = {

  };
  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return db;
}
