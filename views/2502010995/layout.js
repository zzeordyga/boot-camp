// Komponen layout ini akan membungkus semua halaman di bawah /12345678
export default function NimLayout({ children }) {
  return (
    <section className="bg-gray-900 text-white min-h-screen p-8 font-sans">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Halaman Tugas NIM 12345678</h1>
        <p className="text-lg text-gray-400">Dibuat oleh [Nama Anda]</p>
      </header>
      <main className="container mx-auto">
        {children}
      </main>
      <footer className="text-center mt-12 text-gray-500">
        <p>Tugas React & Next.js Integration</p>
      </footer>
    </section>
  );
}
