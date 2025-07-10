'use client'
import './global.css'

const LayoutPage = ({children}) => {
    return(
        <>
            <main className="min-h-screen bg-[var(--background-color)] pt-10">{children}</main>
            <div className="w-full bg-[var(--text-color)] p-4 sm:p-6 text-center">
                <span className="text-yellow-50 text-lg font-bold">&copy; 2025 WordNest. By Muhammad Diva Illyas.</span>
            </div>
        </>
    );
}

export default LayoutPage;