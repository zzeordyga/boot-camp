import { addDoc, collection, Timestamp } from "firebase/firestore";
import getConfig from "../firebase/config";

import modalStyles from "./modal.module.css";
import { useState } from "react";


export default function AddPostModal({setShowModal}){
    const {db} = getConfig();
    const [form, setForm] = useState({
        title: "",
        content: "",
        createdAt: Timestamp.now()
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            const postCol = collection(db, "posts");
            await addDoc(postCol, form);
            setShowModal(false);
        } catch (error) {
            console.error("Error adding document: ", error);
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
                right: "14px",
                background: "transparent",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer"
            }}
            >
            &times;
            </button>

            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Post</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
                Title:
                <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                style={{ padding: "8px", marginTop: "6px" }}
                />
            </label>

            <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
                Content:
                <input
                type="text"
                name="content"
                value={form.content}
                onChange={handleChange}
                required
                style={{ padding: "8px", marginTop: "6px" }}
                />
            </label>

            <button
                onClick={handleSubmit}
                style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
                }}
            >
                Add
            </button>
            </div>
        </div>
        </div>
    </>
    );
}