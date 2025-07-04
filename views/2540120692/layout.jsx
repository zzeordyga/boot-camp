import './globals.css';

export default function Layout({ children }) {
    return (
        <html>
            <body>
                <div className="min-h-screen bg-gray-100 text-gray-800 px-4 py-6">
                    <div className="max-w-3xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6 text-center">Post Viewer</h1>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}