import "./globals.css";

export const metadata = {
  title: "Next.js + Firebase Assignment",
  description: "Posts app built with Next.js and Firestore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
