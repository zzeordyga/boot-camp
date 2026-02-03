'use client'
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Link from "next/link";

export default function UserPage() {
    const {role, loading} = useAuthGuard();
    if (loading)
    {
        return <>Loading...</>
    }

    return (
        <div className="listContainer">
            <div>
                {role !== "admin" || role !== "user" && (
                    <>
                        <div>
                            Authenticated user access denied
                        </div>
                    </>
                )}
            </div>
            <div>
                {role === "admin" || role === "user" && (
                    <>
                        <div>
                            Welcome to user profile
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
