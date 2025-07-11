import Link from "next/link";

export default function RootLayout({children}){
    return <div>
        {children}
        <div className="footer"><Link href="/2502006341">{"< "}Back to Main Page</Link></div>
    </div>
}