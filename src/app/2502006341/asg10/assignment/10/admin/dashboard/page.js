"use client"
import { useEffect, useState } from "react";
import getFirebase from "../../../../database/config";
import DashboardView from "./dashboard";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

export default function AdminPage() {

    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    
    useEffect(()=>{
        const {db, auth} = getFirebase();
        const getUser = async () => {
            const currUser = auth.currentUser;
            const userRef = doc(db, "users", currUser.uid);
            const userSnap = await getDoc(userRef);
            if(userSnap.exists){
                setUser(userSnap.data());
            }
        };
        const getUsersList = async () => {
            const usersCol = collection(db, "users");
            const usersSnap = await getDocs(usersCol);
            const usersList = usersSnap.docs.map((user)=> ({
                id: user.id,
                ...user.data()
            }));
            setUsers(usersList);
        }
        getUser();
        getUsersList();
    })

    return <div>
        <DashboardView user={user} usersList={users}/>
    </div>
}