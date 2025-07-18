"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";

export default function Layout({children}){

    const pathName = usePathname();
    const mainRoute = "/2502006341/asg8-nextjs";

    return (
    <div>
        <nav id="navbar">
            <Link href={mainRoute} 
            className={pathName==mainRoute? "active" : ""}>
                Home
            </Link>
            <Link href={`${mainRoute}/books`} 
            className={pathName==`${mainRoute}/books`? "active" : ""}>
                Books
            </Link>
            <Link href={`${mainRoute}/movies`}
            className={pathName==`${mainRoute}/movies`? "active" : ""}>
                Movies
            </Link>
            <Link href={`${mainRoute}/quotes`} 
            className={pathName==`${mainRoute}/quotes`? "active" : ""}>
                Quotes
            </Link>
        </nav>
        {children}
        <div className="footer"><Link href="/2502006341">{"< "}Back to Main Page</Link></div>
    </div>
  )
}