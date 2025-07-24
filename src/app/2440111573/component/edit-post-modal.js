import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import getConfig from "../firebase/config";
import { useEffect, useState } from "react";


export default function EditPostModal({ setShowModal, postID }) {
    const { db } = getConfig();
    const [content, setContent] = useState("");

    //console.log("postID: ", postID);

    const handleChange = (e) => {
        const {value} = e.target;
        setContent(value);
    };

    const handleSubmit = async () => {
        try {
            const postRef = doc(db, "posts", postID);
            await updateDoc(postRef, {content});
            setShowModal(false);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0, 0, 0, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}
            >
                <div
                    style={{
                        background: "#fff",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                        minWidth: "300px",
                        position: "relative"
                    }}
                >
                    <button
                        onClick={() => setShowModal(false)}
                        title="Close"
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            backgroundColor: "#f00",
                            color: "#fff",
                            borderRadius: "50%",
                            border: "none",
                            cursor: "pointer"
                        }}
                    >
                        X
                    </button>
                    <h2>Edit Post</h2>
                    <span>For Post Id: {postID}</span>
                    <textarea
                        name="content"
                        value={content}
                        onChange={handleChange}
                        placeholder="Content"
                        style={{ width: "100%", height: "100px", marginBottom: "10px" }}
                    />
                    <button
                        onClick={handleSubmit}
                        style={{
                            padding: "10px 20px",
                            backgroundColor: "#007bff",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                        }}
                    >
                        Save Changes
                    </button>
                </div>  
            </div>
        </>
    );
}