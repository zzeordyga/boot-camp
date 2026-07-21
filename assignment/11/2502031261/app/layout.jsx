import { SettingsProvider } from "../src/context/SettingsContext";
import "./globals.css";

export const metadata = {
  title: "Task Manager",
  description: "A real-time task management app built with Next.js and Firestore",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
