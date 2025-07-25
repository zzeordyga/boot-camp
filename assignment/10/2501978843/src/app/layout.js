import './globals.css';

export const metadata = {
  title: 'Firebase Auth & Authorization',
  description: 'Bootcamp Assignment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}