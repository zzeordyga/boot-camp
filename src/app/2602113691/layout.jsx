import React from 'react'
import { Geist } from 'next/font/google'

const geist = Geist({
    subsets: ['latin']
})

export default function layout({ children }) {
  return (
    <div className={geist.className}>
        <h1>Kenneth Ferlianto - 2602113691</h1>
        <p>Welcome to my page.</p>
        <hr />
        {children}
    </div>
  )
}
