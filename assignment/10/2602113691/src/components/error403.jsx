import React from 'react'
import styles from './components.module.css'
import Link from 'next/link'

export default function Error403() {
  return (
    <div className={styles.error403}>
        <h1>Error 403</h1>
        <p>You do not have permission to access this page.</p>
        <Link href={'/'}>Go back to Home</Link>
    </div>
  )
}
