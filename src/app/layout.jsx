import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import '../style.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            <title>Boot Camp</title>
            <meta name="description" content="My App is a..." />
        </head>
        
          <body>
            <ErrorBoundary>
            <div id="root">{children}</div>
            </ErrorBoundary>
        </body>
        
        
    </html>
  )
}