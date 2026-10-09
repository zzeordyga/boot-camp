import Script from "next/script";
import MainLayout from "../../../views/2602080125/layout";

const Layout = ({ children }) => {
    return (
        <>
            <Script
                src="https://cdn.tailwindcss.com"
                strategy="afterInteractive"
            />
            <MainLayout>
                {children}
            </MainLayout>
        </>
    );
}
export default Layout
