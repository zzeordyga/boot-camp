import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <div>
      <div>
        <AuthProvider>{children}</AuthProvider>
      </div>
    </div>
  );
}