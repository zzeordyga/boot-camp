"use client"

import ErrorState from "@/components/errorState";
import { SkeletonTable } from "@/components/skeleton";
import getDatabase from "@/firebase/config"
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react"

export default function PostsPage() {
    const [ notes, setNotes ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ search, setSearch ] = useState("");
    const [ error, setError ] = useState(null);


    useEffect (() => {
        const db = getDatabase();
        const collRef = collection(db, "notes");
        const unsubscribe = onSnapshot(
            collRef,
            (snapshot) => {
                const notesList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setNotes(notesList);
                setLoading(false);
            },
            (error) => {
                setError(error.message)
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    if(loading) {
        return <SkeletonTable />
    }

    if(error) {
        return <ErrorState message={error} />
    }

    return (
        <div className="min-h-screen flex flex-col gap-5 items-center text-center justify-center">
            <div className="w-full max-w-6xl flex justify-end mr-6 items-center gap-2">
                <input type="text" placeholder="Search Notes..." className="border border-gray-400 w-lg px-4 py-2 rounded-md" value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600" onClick={() => { }} >
                    Search
                </button>
            </div>
            <table>
                <thead className="m-10">
                    <tr>
                        <th className="border border-black px-5 py-2 bg-gray-200">Subject</th>
                        <th className="border border-black px-5 py-2 bg-gray-200">Material</th>
                        <th className="border border-black px-5 py-2 bg-gray-200">Course Schedule</th>
                    </tr>
                </thead>
                <tbody>
                    {notes
                        .filter((note) => {
                            if (!search) return true;
                            return note.subject?.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((note) => (
                            <tr key={note.id}>
                                <td className="border border-black px-5 py-2">{note.subject}</td>
                                <td className="border border-black px-5 py-2">{Array.isArray(note.material) ? note.material.join(", ") : note.material}</td>
                                <td className="border border-black px-5 py-2">{note.courseSchedule && (note.courseSchedule.toDate ? note.courseSchedule.toDate().toLocaleString() : new Date(note.courseSchedule).toLocaleString())}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    )
}