import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export default function getDatabase() {
    const firebaseConfig = {
        apiKey: "AIzaSyC7_dR3pPRt-wrQ9usmf3pEpGLYZzK-8qU",
        authDomain: "asg-fe-bootcamp.firebaseapp.com",
        projectId: "asg-fe-bootcamp",
        storageBucket: "asg-fe-bootcamp.firebasestorage.app",
        messagingSenderId: "1025269961197",
        appId: "1:1025269961197:web:ccb4204d980869fa00d7e4"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    return db;
}