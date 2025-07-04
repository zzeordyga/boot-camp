import "./globals.css";

export const metadata = {
  title: "AIC Gallery",
  description: "Browse artworks from the Art Institute of Chicago",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased text-gray-800 min-h-screen flex flex-col"
      >
        <header className="text-gray-900 bg-[#FAF0E6] p-4">
          <h1 className="text-xl font-bold">Artworks Gallery</h1>
        </header>
        <main className="p-6 max-w-6xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
