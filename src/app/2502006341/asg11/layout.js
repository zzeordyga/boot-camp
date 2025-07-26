import { ThemeProvider } from "./context/ThemeContext";

export default function Layout({children}) {
    return <ThemeProvider>{children}</ThemeProvider>
}