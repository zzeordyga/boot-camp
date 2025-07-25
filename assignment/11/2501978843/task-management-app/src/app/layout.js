import { UserSettingsProvider } from '../context/UserSettingsContext';

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