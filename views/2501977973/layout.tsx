import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">NIM 12345678 - Page</h1>
      {children}
    </div>
  );
};

export default Layout;