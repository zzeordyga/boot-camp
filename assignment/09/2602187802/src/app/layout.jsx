import "./globals.css";

export const metadata = {
  title: "Case 5 - Next.js + Firebase Posts",
  description: "Firestore real-time posts feed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}

