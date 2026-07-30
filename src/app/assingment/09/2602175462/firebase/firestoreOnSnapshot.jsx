import { collection, Firestore, onSnapshot } from "firebase/firestore"
import { db } from "./Initialize"

export function firestoreOnSnapshot(onSuccess, onError) {
    const unsubscribe = onSnapshot(
        collection(db, "posts"),
        (snapshot) =>{
            // onError('Error simulation')
            const posts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            onSuccess(posts);
        },
        (error) =>{
            if(onError){
                onError(error);
            }
        }
    );

    return unsubscribe;
}
