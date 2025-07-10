'use client'
import './global.css'
import ErrorBoundary from '../components/ErrorBoundary.js';
import FooterPage from './footer.js'

const LayoutPage = ({children}) => {
    return(
        <>
            <main className="min-h-screen bg-[var(--background-color)] py-10">
                <ErrorBoundary>
                    {children}
                 </ErrorBoundary>
            </main>
            <FooterPage />
        </>
    );
}

export default LayoutPage;