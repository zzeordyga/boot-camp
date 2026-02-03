import base from '../lib/clientApp'
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export function useAuthGuard()
{
  const router = useRouter();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(base.auth, async(user) =>
      {
          if (user)
          {
              const uid = user.uid
              const reference = doc(base.db, "users", uid)
              const snapshot = await getDoc(reference)

              if (snapshot.exists())
              {
                  const userData = snapshot.data();
                  setRole(userData.role);
              }
              else
              {
                  console.log("User data not found")
              }
          }
          else
          {
              setRole("guest");
              router.push("/login");
          }
          setLoading(false);
      })

      return() => unsubscribe();
  }, [base.auth, base.db, router]);

  return {role, loading};
}