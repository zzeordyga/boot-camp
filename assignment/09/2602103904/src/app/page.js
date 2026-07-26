"use client"

import Link from "next/link"
import { collection, getCountFromServer, query, orderBy, limit, getDocs } from "firebase/firestore"
import getDatabase from "@/firebase/config"
import { useEffect, useState } from "react"

export default function Home () {
  const db = getDatabase();
  const [ totalCount, setTotalCount ] = useState(0);
  const [lastAdded, setLastAdded] = useState(null);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    async function fetchDbStatus() {
      try {
        const collRef = collection(db, 'notes');
        // Count Total Database Created
        const snapshot = await getCountFromServer(collRef);
        setTotalCount(snapshot.data().count);

        // Timestamp Last Database Created
        const latestQuery = query(collRef, orderBy('timeCreated', 'desc'), limit (1));
        const querySnapshot = await getDocs(latestQuery);

        if(!querySnapshot.empty){
          const latestDoc = querySnapshot.docs[0].data();
          const formattedTime = latestDoc.timeCreated?.toDate().toLocaleDateString();
          setLastAdded(formattedTime);
        }
      } catch(error) {
        console.error('Error Fetching Database Status: ', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDbStatus();
  }, []);

  return (
    <div className="min-h-screen flex items-center text-center justify-center">
      <div className="bg-gray-200 max-w-xl px-6 py-10 rounded-lg shadow-md">
        <h1 className="flex items-center justify-center gap-3 text-3xl font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <path fill="currentColor" d="M7.5 22q-1.45 0-2.475-1.025T4 18.5v-13q0-1.45 1.025-2.475T7.5 2H20v15q-.625 0-1.062.438T18.5 18.5t.438 1.063T20 20v2zM6 15.325q.35-.175.725-.25T7.5 15H8V4h-.5q-.625 0-1.062.438T6 5.5zM10 15h8V4h-8zm-4 .325V4zM7.5 20h9.325q-.15-.35-.237-.712T16.5 18.5q0-.4.075-.775t.25-.725H7.5q-.65 0-1.075.438T6 18.5q0 .65.425 1.075T7.5 20"/>
          </svg>
          Lecture Notes
        </h1>
        <div className="text-lg p-5">Organize and access the study notes in real-time with Firebase Firestore</div>
        <Link href="/posts" className="mb-5 inline-block bg-blue-500 rounded-md text-white text-xl px-6 py-3 hover:bg-blue-600">
          View Notes
        </Link>
        <div>
          {loading ? (
            <p>Count: Loading...</p>
          ) : (
            <p>Count: <strong>{totalCount}</strong></p>
          )}
        </div>
        <div>
          {loading ? (
            <p>Last Updated: Loading...</p>
          ) : (
            <p>Last Updated: <strong>{lastAdded ? lastAdded : 'No notes added' }</strong></p>
          )}
        </div>
      </div>
    </div>
  )
}