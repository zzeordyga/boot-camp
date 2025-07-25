import { SettingsProvider } from '../context/SettingsContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <Component {...pageProps} />
    </SettingsProvider>
  );
}

export default MyApp;