import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


function getFirebaseConfig() {
   return {
        apiKey: "AIzaSyAQ10ePehlgvUUuMWzTksOAa2pL_KAIynM",
        authDomain: "fe-bootcamp-ses09.firebaseapp.com",
        projectId: "fe-bootcamp-ses09",
        storageBucket: "fe-bootcamp-ses09.firebasestorage.app",
        messagingSenderId: "966457576422",
        appId: "1:966457576422:web:8cbfacc99e9036e08a6427"
    };
}

export default function getConfig() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);
  return {
    db,
    auth
  };
}

