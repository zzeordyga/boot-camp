import { collection, getDocs, doc, getdoc, snapshotEqual } from "firebase/firestore";
import { db } from "./Initialize";

export async function getPosts(){
    // throw new Error("Error buatan")

    const snapshot = await getDocs(collection(db, "posts"));

    return snapshot.docs.map((doc)=> ({
        id: doc.id,
        ...doc.data(),
    }));
}

export async function getPost(id) {
    const snapshot = await getDoc(doc(db, "posts", id));

    if(!snapshot.exists()) return null;

    return{
        id:snapshot.id,
        ...snapshot.data(),
    }
    
}