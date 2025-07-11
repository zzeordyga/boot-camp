// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBALueChUxoh8-lpseQUxZvCJ02nzgTiY8",
  authDomain: "nextjs-posts-5f459.firebaseapp.com",
  projectId: "nextjs-posts-5f459",
  storageBucket: "nextjs-posts-5f459.firebasestorage.app",
  messagingSenderId: "876897334051",
  appId: "1:876897334051:web:3110081a2c077c417c5296",
  measurementId: "G-5CV62VDDQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { db };