import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdS5OGfRyqxvL05xhW2f8DOSKYP2JvUNA",
  authDomain: "devani-firebase.firebaseapp.com",
  projectId: "devani-firebase",
  storageBucket: "devani-firebase.firebasestorage.app",
  messagingSenderId: "294634998765",
  appId: "1:294634998765:web:5e063d76bbaa52ec6df5e4",
  measurementId: "G-8K3Q265WPH",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
