export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            <title>Boot Camp</title>
            <meta name="description" content="My App is a..." />
        </head>
        <body>
            <div id="root">{children}</div>
        </body>
    </html>
  )
}