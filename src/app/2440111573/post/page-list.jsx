'use client';

import { useState } from "react";
import AddPostModal from "../component/add-post-modal";
import getConfig from "../firebase/config";
import { collection, deleteDoc, doc } from "firebase/firestore";
import EditPostModal from "../component/edit-post-modal";


export default function postListComponent({posts}){
    const [showModal, setShowModal] = useState(false);
    const [editPost, setEditPost] = useState(false);
    const {db} = getConfig();
    const postCol = collection(db, "posts");

    const [editID, setEditID] = useState("");

    const handleAddPost = () => {
        setShowModal(true);
    };
    
    const handleEditPost = (id) => {
        setEditID(id)
        console.log("editID: ", editID);
        setEditPost(true);
    }
    const handleDelete = async(id) => { 
        try{
            const postPath = doc(db, postCol.path, id);
            await deleteDoc(postPath);

        }catch(error){
            console.error("Error deleting document: ", error);
        }
        
    }

    return(
        <>
        <div>
            <div>
            <button
            style={{
                marginBottom: "20px",
                padding: "10px 15px",
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
            }}
            onClick={handleAddPost}
            >
            Add
            </button>
           </div>
           <li>
            {posts.map((post) => (
                <div
                key={post.id}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "16px",
                    margin: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#fff",
                    width: "300px",
                    minHeight: "150px",
                }}
                >
                <h4
                    style={{
                    margin: "0 0 10px 0",
                    fontSize: "1.2em",
                    color: "#333",
                    }}
                >
                    {post.title}
                </h4>
                <p
                    style={{
                    margin: "0 0 15px 0",
                    color: "#666",
                    lineHeight: "1.5",
                    }}
                >
                    {post.content}
                </p>

                <div
                    style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                    marginBottom: "12px",
                    }}
                >
                    <button
                    onClick={() => handleEditPost(post.id)}
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                    }}
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => handleDelete(post.id)}
                    style={{
                        padding: "6px 12px",
                        backgroundColor: "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.9rem",
                    }}
                    >
                    Delete
                    </button>
                </div>

                <time
                    style={{
                    marginTop: "auto",
                    fontSize: "0.9em",
                    color: "#888",
                    }}
                >
                    {post.createdAt}
                </time>
                </div>
            ))}
            </li>

            {showModal && <AddPostModal setShowModal={setShowModal} />}
            {editPost && <EditPostModal setShowModal={setEditPost} postID={editID} />}
        </div>
        </>
    );
}