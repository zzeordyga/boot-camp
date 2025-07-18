import Script from "next/script";

import Header from "./_components/Header";

export const metadata = {
  title: "Assignment 10 | 2501995345",
};

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="px-4 md:px-8 lg:px-20">{children}</div>

      {/* added script due to tailwindcss/vite not working */}
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
    </>
  );
}
