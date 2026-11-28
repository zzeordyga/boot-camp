import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Case 10 - Firebase Auth & RBAC",
  description: "Authentication, Authorization, and Route Protection with Firebase",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
