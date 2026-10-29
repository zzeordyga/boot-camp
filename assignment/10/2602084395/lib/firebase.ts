import { initializeApp, getApps, getApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyA5Kon2vms768E8VagaKTS9hAM3ryrPaAA",
  authDomain: "bootcamp-session-10.firebaseapp.com",
  projectId: "bootcamp-session-10",
  storageBucket: "bootcamp-session-10.firebasestorage.app",
  messagingSenderId: "508948105315",
  appId: "1:508948105315:web:fec1bf453fb304018e1056"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const auth = getAuth(app)
const db = getFirestore(app)

export { app, auth, db }