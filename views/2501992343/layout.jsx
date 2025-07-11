export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">My App</h1>
          <h1 className="text-xl font-bold">2501992343-Vincent</h1>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
      
    </div>
  )
}