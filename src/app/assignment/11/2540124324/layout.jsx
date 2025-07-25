// app/layout.jsx (bukan pages/_app.js)
import { UserSettingsProvider } from "./context/UserSettingsContext";

export const metadata = {
  title: "Task Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserSettingsProvider>
          {children}
        </UserSettingsProvider>
      </body>
    </html>
  );
}
