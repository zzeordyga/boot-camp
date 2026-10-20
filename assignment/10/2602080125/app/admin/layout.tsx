import RoleGuard from "@/components/guard/RoleGuard";
import MainLayout from "@/components/layout/MainLayout";

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    return (
        <RoleGuard requiredRole="admin">
            <MainLayout>{children}</MainLayout>
        </RoleGuard>
    );
}
export default AdminLayout