
import { Inter } from 'next/font/google'
import Link from 'next/link'


const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600', '700'],
})
export default function Layout({ children }) {
    
    return (
        <section className={inter.className} style={{ display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height: '100vh' }}>
            <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6'>
                {children}

            </div>
        </section>

    )
}