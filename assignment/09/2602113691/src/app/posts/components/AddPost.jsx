"use client";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import getDatabase from "@/firebase/config";
import styles from './components.module.css'
import { useState } from "react";

export default function AddPost() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const addNewPost = async (title, content) => {
    const db = getDatabase();

    setLoading(true)
    try {
      await addDoc(collection(db, "posts"), {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
      });
      setOpen(false)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget)

    const title = formData.get("title");
    const content = formData.get("content");
    addNewPost(title, content)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} className={styles['add-post-btn']}>
        Add Post +
      </button>

       {
        open && (
          <div className={styles.modal}>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <label className={styles.label} htmlFor="title">Post Title
                <input className={styles.input} type="text" required maxLength={100} name="title" id="title"/>
              </label>
              <label className={styles.label} htmlFor="content">Post Content
                <textarea className={styles.input} rows={8} maxLength={5000} name="content" id="content" required></textarea>
              </label>
              <div className={styles.buttons}>
                <button className={`${styles['modal-btn']} ${styles.submit}`} type="submit">Done</button>
                <button className={`${styles['modal-btn']} ${styles.close}`} type="button" onClick={() => setOpen(false)}>Close</button> 
                {
                  loading ? 'Posting...' : ''
                }  
              </div>
            </form>
          </div>
        )
       }
    </>
  );
}