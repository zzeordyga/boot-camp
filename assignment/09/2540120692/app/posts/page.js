'use client';
import { useEffect, useRef, useState } from "react";
import getDatabase from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import Loading from "@/components/loading";

export default function PostPage() {
    const [postsList, setPostList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");

    const inputRef = useRef(null)

    useEffect(() => {
        try {
            const fetchFoods = async () => {
                const db = getDatabase()
                if (title == "") {
                    const postsCol = collection(db, "posts")
                    const postsSnapshot = await getDocs(postsCol);
                    const postsList = postsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setPostList(postsList);
                } else {
                    const postsCol = query(collection(db, "posts"), where('title', '==', title))
                    const postsSnapshot = await getDocs(postsCol);
                    const postsList = postsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }))
                    setPostList(postsList);
                }
            };
            fetchFoods();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [title])

    if (loading) {
        return <Loading />
    }

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        setTitle(formJson.title)

        inputRef.current.focus();
    }

    return (
        <div className="p-10 flex flex-col items-center">
            <form className="flex space-x-4 items-center my-4" method="get" onSubmit={handleSubmit}>
                <label>
                    Title : <input ref={inputRef} className="bg-white w-xl border p-1" name="title" />
                </label>
                <button className="bg-blue-500 h-8.5 rounded-md px-4 text-white" type="submit">Search</button>
            </form>
            <table className="border-2">
                <thead>
                    <tr>
                        <th className="border-2">ID</th>
                        <th className="border-2">Title</th>
                        <th className="border-2">Content</th>
                        <th className="border-2">Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {postsList.map((post) => (
                        <tr className="border-2 p-1" key={post.id}>
                            <td className="border-2 p-1">{post.id}</td>
                            <td className="border-2 p-1">{post.title}</td>
                            <td className="border-2 p-1">{post.content}</td>
                            <td className="border-2 p-1">{post.createdAt.toDate().toString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );



}
