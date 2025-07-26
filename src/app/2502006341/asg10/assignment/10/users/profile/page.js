"use client"
import getFirebase from "../../../../database/config";
import UserProfile from "./user_profile";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function UserPage(){

    const [user, setUser] = useState({});

    useEffect(()=>{
        const fetchUser = async () => {
            const {auth, db} = getFirebase();
            const currUser = auth.currentUser;
            console.log(currUser);
            const userRef = doc(db, "users", currUser.uid);
            const userSnap = await getDoc(userRef);
            if(userSnap.exists){
                setUser(userSnap.data());
            }
        }
        fetchUser();
    }, []);
    
    return <div>
        <UserProfile user={user} />
    </div>
}