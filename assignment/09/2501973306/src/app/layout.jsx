import ErrorBoundary from '../components/ErrorBoundary';


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ErrorBoundary>
                    {children}
                </ErrorBoundary>
            </body>
        </html>
    );
}