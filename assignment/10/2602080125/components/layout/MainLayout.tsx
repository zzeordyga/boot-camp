import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import PanelNavigation from "../common/PanelNavigation";

interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-1 flex-col">
            <Navbar />
            <PanelNavigation />
            <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-8">{children}</main>
            <Footer />
        </div>
    );
}
export default MainLayout