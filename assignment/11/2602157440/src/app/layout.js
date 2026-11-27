import './globals.css';
import { SettingsProvider } from '@/context/SettingsContext';

export const metadata = {
  title: 'Task Manager — Alif Arya Ramadhan (2602157440)',
  description: 'Task Management App dengan Next.js, Context API, dan Firebase Firestore.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    // data-theme & lang diubah di client oleh SettingsProvider setelah mount.
    <html lang="id" data-theme="light" suppressHydrationWarning>
      <body>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
