// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDvCz5mWFGwcH-HUjIXtaUPNa42XEzeSaM",
    authDomain: "session-9-e548e.firebaseapp.com",
    projectId: "session-9-e548e",
    storageBucket: "session-9-e548e.firebasestorage.app",
    messagingSenderId: "129849495412",
    appId: "1:129849495412:web:8000334fc1d57761ffa621",
    measurementId: "G-JJCV3R18PF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);