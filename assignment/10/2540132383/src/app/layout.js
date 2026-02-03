'use client'

import React from "react";
import {useRouter} from "next/navigation";
import "./styles.css";

export default function Layout({ children })
{
    const router = useRouter();

    return(
        <html lang="en">
        <body>
        <header>
            <div className='headerContainer'>
                <button onClick={() => router.push(`/`)}
                        className='buttonStyle'>Main Page</button>
            </div>
        </header>
        <main>
            {children}
        </main>
        </body>
        </html>
    )
}