'use client'
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Link from "next/link";

export default function AdminPage() {
    const {role, loading} = useAuthGuard();
    if (loading)
    {
        return <>Loading...</>
    }

    return (
        <div className="listContainer">
            <div>
                {role !== "admin" && (
                    <>
                        <div>
                            Admin access denied
                        </div>
                    </>
                )}
            </div>
            <div>
                {role === "admin" &&(
                    <>
                        <div>
                            Welcome to admin dashboard
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
