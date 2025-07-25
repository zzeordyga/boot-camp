import Script from "next/script";
import { LanguageProvider } from "./_contexts/LanguageContexts";
import { ModalProvider } from "./_contexts/ModalContext";
import Modals from "./_components/Modals";
import Header from "./_components/Header";

export default function Layout({ children }) {
  return (
    <>
      <LanguageProvider>
        <ModalProvider>
          <Modals />
          <Header />
          {children}
        </ModalProvider>
      </LanguageProvider>
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
    </>
  );
}
