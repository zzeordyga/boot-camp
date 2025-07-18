import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function getFirebaseConfig() {
  return {
    apiKey: "AIzaSyC7_dR3pPRt-wrQ9usmf3pEpGLYZzK-8qU",
    authDomain: "asg-fe-bootcamp.firebaseapp.com",
    projectId: "asg-fe-bootcamp",
    storageBucket: "asg-fe-bootcamp.firebasestorage.app",
    messagingSenderId: "1025269961197",
    appId: "1:1025269961197:web:ccb4204d980869fa00d7e4",
  };
}

export default function getConfig() {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  return {
    db,
    auth,
    app
  };
}
