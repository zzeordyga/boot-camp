export default function RootLayout({ children }) {
  return (
    <html>
      <body style={{ margin: "0 auto", backgroundColor: "#f2f2f2", fontFamily: "Arial, sans-serif" }}>
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
