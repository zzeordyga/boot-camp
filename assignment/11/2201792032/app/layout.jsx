// app/layout.jsx
import './globals.css'
import { SettingsProvider } from '@/context/SettingsContext'

export const metadata = {
  title: 'Task Manager',
  description: 'Assignment 11',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  )
}
