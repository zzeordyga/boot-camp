"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Role, useAuth } from "@/components/provider/AuthProvider";

interface RoleGuardProps {
    children: React.ReactNode;
    requiredRole?: Role;
}

const RoleGuard = ({ children, requiredRole }: RoleGuardProps) => {
    const router = useRouter();
    const { user, role, loading } = useAuth();
    const forbidden = !!user && !!requiredRole && role !== requiredRole;

    useEffect(() => {
        if (loading) return;
        if (!user) {
            router.replace("/login");
        } else if (forbidden) {
            toast.error("Admin only");
            router.replace("/user/profile");
        }
    }, [user, loading, forbidden, router]);

    if (loading || !user || forbidden) {
        return (
            <div
                role="status"
                aria-live="polite"
                className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 bg-background"
            >
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    return <>{children}</>;
}
export default RoleGuard