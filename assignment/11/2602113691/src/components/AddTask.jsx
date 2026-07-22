'use client'

import React, { useState } from "react";
import styles from "./AddTask.module.css";
import getDatabase from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AddTask(props) {
  const { onClose } = props

  const [loading, setLoading] = useState(false)

  const addNewTask = async (title, date, time) => {
    const db = getDatabase();

    setLoading(true)
    try {
      await addDoc(collection(db, "tasks"), {
        taskName: title,
        dueDate: new Date(`${date} ${time}`),
        status: 'In Progress',
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

    const title = formData.get("task-name");
    const date = formData.get("date");
    const time = formData.get("time");
    addNewTask(title, date, time)
  }
    
  return (
    <div className={styles.modal}>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label className={styles.label} htmlFor="task-name">
          Task Name
          <input
            className={styles.input}
            type="text"
            required
            maxLength={100}
            name="task-name"
            id="task-name"
          />
        </label>
        <label className={styles.label} htmlFor="due-date">
          Due Date
          <div className={styles['input-date-time']}>
            <input className={`${styles.input} ${styles.date}`} required type="date" name="date" id="due-date" />
            <input className={`${styles.input} ${styles.time}`} type="time" name="time" id="due-date"/>
          </div>

        </label>
        <div className={styles.buttons}>
          <button
            className={`${styles["modal-btn"]} ${styles.submit}`}
            type="submit"
            disabled={loading ? true : false}
          >
            Done
          </button>
          <button
            className={`${styles["modal-btn"]} ${styles.close}`}
            type="button"
            onClick={onClose}
            disabled={loading ? true : false}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
