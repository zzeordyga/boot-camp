"use client";
import React from 'react'
import ProtectedAdminRoute from '../../firebase/ProtectedAdminRoute'

export default function page() {
  return (
    <ProtectedAdminRoute>
        <div>
            <p>You're The Admin</p>
        </div>
    </ProtectedAdminRoute>
  )
}