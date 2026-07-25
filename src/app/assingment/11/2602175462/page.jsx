import React from 'react'
import ProtectedRoute from './firebase/ProtectedRoute'
import ThemeBtn from './components/ThemeBtn'
import styles from "./page.module.css"
import './globals.css'


export default function page() {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
          <h1 className={styles.h1}>Task Management App</h1>
          {/* fetch data yang ada di firestore sesuai pengguna */}
          {/* btn add data */}
          <ThemeBtn/>
          <button>Add New Tasks</button>
      </div>
    </ProtectedRoute>
  )
}