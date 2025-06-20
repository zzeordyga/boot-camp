// src/components/Layout.jsx
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen relative flex flex-col bg-gray-50 text-gray-800">
      {/* ↑ add 'relative' here */}
      <Navbar />
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
