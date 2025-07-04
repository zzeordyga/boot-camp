import React from "react";

import { Poppins } from "next/font/google";
import Link from "next/link";
import "../2540124324/style.css"; 

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function Layout({ children }) {
  return (
    <div className={poppins.className}>
      <div className="navbar">
        <Link href={"/2540124324"}>
          <p>Home</p>
        </Link>
        <Link href={"/2540124324/pokemon"}>
          <p>Pokemon</p>
        </Link>
      </div>
      {children}
    </div>
  );
}

export default Layout;
