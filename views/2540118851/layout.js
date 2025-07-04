import React, { useState } from 'react';
import Link from 'next/link';

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="min-h-screen bg-gray-100">
      
      <nav className="bg-white shadow-md top-0 left-0 w-full z-10 fixed">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold ">Facts4Yew</span>
            </div>

            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-white hover:bg-black focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                  />
                </svg>
              </button>
            </div>

            <div className="hidden md:flex space-x-3=2">
              <Link href="/2540118851" className="text-gray-700 px-4 rounded-lg py-2 hover:bg-black hover:text-white">
                Fact Generator
              </Link>
              <Link href="/2540118851/details" className="text-gray-700 hover:text-white rounded-lg px-4 py-2 hover:bg-black">
                More Facts!
              </Link>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link href="/2540118851" className="block text-gray-700 hover:bg-black hover:text-white p-3 rounded-xl">
              Home
            </Link>
            <Link href="/2540118851/details" className="block ext-gray-700 hover:text-white hover:bg-black p-3 rounded-xl">
              Detail
            </Link>
          </div>
        )}
      </nav>

      <main className="h-screen top-0 flex items-center justify-center">{children}</main>
    </div>
  );
};

export default Layout;
