import { SettingsProvider } from '@/context/SettingsContext';
import { SETTINGS_KEY } from '@/lib/settings';
import Header from '@/components/Header';
import './globals.css';

export const metadata = {
  title: 'Tasks · 2602181004',
  description: 'Task manager with Next.js, Firestore and real-time updates',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const applySavedSettings = `try{var s=JSON.parse(localStorage.getItem('${SETTINGS_KEY}'));if(s&&(s.theme==='light'||s.theme==='dark'))document.documentElement.dataset.theme=s.theme;if(s&&(s.language==='en'||s.language==='id'))document.documentElement.lang=s.language}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: applySavedSettings }} />
      </head>
      <body>
        <SettingsProvider>
          <Header />
          <main className="main">{children}</main>
        </SettingsProvider>
      </body>
    </html>
  );
}
