import { auth, db } from "./config";
import { doc, getDoc } from "firebase/firestore";

export const getUserRole = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data().role : null;
};

export { auth };
