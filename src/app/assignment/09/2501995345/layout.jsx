import Script from "next/script";

export const metadata = {
  title: "Assignment 09 | 2501995345",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="px-4 md:px-8 lg:px-20 py-10">{children}</div>

      {/* added script due to tailwindcss/vite not working */}
      <Script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4" />
    </>
  );
}
