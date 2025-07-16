"use client";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import { app } from "../../utils/firebase";

const profilePage = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const userDB = collection(db, "users");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("User state changed:", user);
      if (!user) {
        return <div>Please log in to access the dashboard.</div>;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        setErrorMsg("user's profile not found in database");
        await signOut(auth);
        return;
      }

      const userDocData = userSnapshot.data();
      const userName = userDocData.name;

      setUserName(userName);
    });
  }, []);
  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      <p>Hi, {userName}.</p>
    </div>
  );
};

export default profilePage;
