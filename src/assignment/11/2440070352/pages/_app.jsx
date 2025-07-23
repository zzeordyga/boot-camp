import { UserSettingsProvider } from '../context/UserSettingsContext';
import '../../../../../styles/globals.css'


export default function App({ Component, pageProps }) {
  return (
    <UserSettingsProvider>
      <Component {...pageProps} />
    </UserSettingsProvider>
  );
}