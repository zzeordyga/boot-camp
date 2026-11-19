import "./globals.css";
import { SettingsProvider } from "../context/SettingsContext";

export const metadata = {
  title: "Task Management App",
  description: "Simple real-time Task Management App with Next.js and Firestore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-theme="light">
      <body>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
