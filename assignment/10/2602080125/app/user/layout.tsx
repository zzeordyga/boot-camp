import RoleGuard from "@/components/guard/RoleGuard";
import MainLayout from "@/components/layout/MainLayout";

interface UserLayoutProps {
    children: React.ReactNode
}

const UserLayout = ({ children }: UserLayoutProps) => {
    return (
        <RoleGuard>
            <MainLayout>{children}</MainLayout>
        </RoleGuard>
    );
}
export default UserLayout