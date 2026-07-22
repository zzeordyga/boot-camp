"use client";

import TaskList from "@/components/TaskList";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import AddTask from "@/components/AddTask";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const router = useRouter();
  const {theme, toggle} = useTheme();

  function handleChange(e) {
    router.push(`?search=${e.target.value}`);
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [sortOrder, setSortOrder] = useState();

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));

    if (savedFilters) {
      setChecked(savedFilters.onlyInProgress);
      setSortOrder(savedFilters.sortOrder)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify({sortOrder: sortOrder, onlyInProgress: checked}))
  }, [checked, sortOrder])

  return (
    <>
      <div className={`${styles.page} ${styles[theme]}`}>
        <main className={`${styles.main} ${styles[theme]}`}>
          <button className={styles['switch-theme']} onClick={toggle}>Switch to {theme === 'light' ? 'dark' : 'light'} theme</button>
          <h1>To Do List</h1>
          <div className={styles.filters}>
            <input placeholder="Search" onChange={handleChange}/>
            <select onChange={(e) => setSortOrder(e.target.value)} value={sortOrder} >
              <option value={"asc"}>Ascending</option>
              <option value={"desc"}>Descending</option>
            </select>
          </div>
          <div className={styles['checkbox-container']}>
            <input type="checkbox" name="show-in-progress-only" onChange={() => setChecked(!checked)} checked={checked} />
            <label htmlFor="show-in-progress-only">Only show tasks that are in progress</label>
          </div>
          <button
            className={styles["btn-add"]}
            onClick={() => setModalOpen(true)}
          >
            Add New Task
          </button>
          <TaskList filterOptions={{sortOrder: sortOrder, onlyInProgress: checked}} />
        </main>
      </div>
      {modalOpen && <AddTask onClose={() => setModalOpen(false)}/>}
    </>
  );
}
