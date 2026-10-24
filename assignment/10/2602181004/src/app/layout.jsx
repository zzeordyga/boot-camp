import { AuthProvider } from '@/components/AuthProvider';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Auth & RBAC · 2602181004',
  description: 'Firebase Authentication with role-based access control',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Header />
          <main className="main">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
