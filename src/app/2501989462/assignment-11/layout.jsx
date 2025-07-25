import { SettingsProvider } from "./context/SettingsContext";

export default function Layout({ children }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
