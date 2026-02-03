'use client'

import React from "react";
import {useRouter} from "next/navigation";
import "./style.css";

export default function Layout({ children })
{
    const router = useRouter();

    return(
        <html lang="en">
            <body>
                <header>
                    <div className='headerContainer'>
                        <button onClick={() => router.push(`/`)}
                                className='buttonStyle'>Student List</button>
                        <button onClick={() => router.push(`/2540132383/`)}
                                className='buttonStyle'>Home</button>
                        <button onClick={() => router.push(`/2540132383/details`)}
                                className='buttonStyle'>Random Cat Facts</button>
                    </div>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    )
}