export const metadata = {
  title: "Auth App",
  description: "Next.js Firebase Auth + RBAC",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: "#111", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
