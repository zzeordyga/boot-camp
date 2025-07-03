export default function Layout({children}){
    return(
        <div className="bg-gray-300 text-black font-serif">
            <header className="bg-blue-900 text-yellow-300">
                <div className="max-w-3x1 mx-auto px-2 py-2 flex justify-evenly items-center-safe">
                    <h1 className="text-2xl font-extrabold">Homepage</h1>
                    <nav className="space-x-2">
                        <a href="/2201803396" className="hover:text-red-600 transition">Home</a>
                        <a href="/2201803396/details" className="hover:text-red-600 transition">About</a>
                    </nav>
                </div>
            </header>
            <main className="max-w-3xl mx-auto px-2 py-4">
                {children}
            </main>
        </div>
    );
}