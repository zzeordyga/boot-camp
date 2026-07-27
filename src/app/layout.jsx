export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <head>
            <title>Boot Camp</title>
            <meta name="description" content="My App is a..." />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </head>
        <body>
            <div id="root">{children}</div>
        </body>
    </html>
  )
}