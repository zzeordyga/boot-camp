import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-blue-600 text-white p-4">
          <h1>Firebase Authentication System</h1>
        </header>
        <main className="p-4">
          {children}
        </main>
        <footer className="bg-gray-800 text-white p-4 mt-8">
          <p>Raphael Vinzenzio Kent Hartono - 2501995143</p>
        </footer>
      </body>
    </html>
  );
}