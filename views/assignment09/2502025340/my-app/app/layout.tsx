import React from "react";

export const metadata = {
  title: "Firebase Posts",
  description: "Next.js + Firebase Example",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0f0f0f",
          color: "white",
          margin: 0,
          fontFamily: "Arial, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
