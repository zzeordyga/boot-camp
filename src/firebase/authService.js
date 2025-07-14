import { auth } from "./config";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./config";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

export const registerUser = (email,password) => { // register new email and create new password
    return createUserWithEmailAndPassword(auth,email,password);
}

export const userLogin = (email,password) => {
    return signInWithEmailAndPassword(auth,email,password); // login based on email and password that you created
}

export const userLogout = () => {
    return signOut(auth); // user can sign out after login
};

export const getUserRole = async (uid) => { // this is use after user gets role
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data().role;
  }
  return null;
};

export const fetchUserRole = async (uid) => {
    try {
       const userDocRef = doc(db, "users", uid); //define the doc ref properly
        const userSnapshot = await getDoc(userDocRef); // get the snapshot

        if(userSnapshot.exists()) {
            const userData = userSnapshot.data();
            return userData.role || "users"; // default will be user, can be change to admin if desire
        }else {
            throw new Error("User not found in Firestore");
        }
    }catch (error){
        console.error("Error fetching user role: ",error);
        throw error;
    }
};