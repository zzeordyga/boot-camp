import "./globals.css";
import { SettingProvider } from "./contexts/SettingContext";
import Appbar from "./components/Appbar";
import ThemeProvider from "./components/ThemeProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-full flex flex-col dark:bg-[#121212]">
        <SettingProvider>
          <ThemeProvider>
            <Appbar />
            <main className="mt-16">{children}</main>
          </ThemeProvider>
        </SettingProvider>
      </body>
    </html>
  );
}
