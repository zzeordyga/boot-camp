import "./globals.css";

export const metadata = {
  title: "Posts - Bootcamp Session 9",
  description: "Next.js dan Firebase Firestore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
