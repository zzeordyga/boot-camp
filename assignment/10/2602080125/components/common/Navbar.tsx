"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, LogOut, ShieldCheck, UserCircle } from "lucide-react";
import { useAuth } from "@/components/provider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const getInitials = (value: string) => value.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("");

const Navbar = () => {
    const router = useRouter();
    const { user, role, logout } = useAuth();
    const [logoutLoading, setLogoutLoading] = useState(false);

    const email = user?.email ?? "Guest";
    const name = email.split("@")[0];
    const initials = getInitials(name) || "?";

    const handleLogout = async () => {
        setLogoutLoading(true);
        try {
            await logout();
            toast.success("Logout successful");
            router.replace("/login");
        } catch {
            toast.error("Logout failed");
            setLogoutLoading(false);
        }
    };

    return (
        <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
            <nav className="mx-auto flex h-16 w-full max-w-[1920] items-center justify-between gap-4 px-6">
                <Link href="/user/profile" className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="size-5" />
                    <span>Assignment 10</span>
                </Link>

                <Popover>
                    <PopoverTrigger
                        render={
                            <Button variant="ghost" size="icon" className="rounded-full p-0" title="Account">
                                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                    {initials}
                                </span>
                            </Button>
                        }
                    />

                    <PopoverContent align="end" className="w-68 gap-0 overflow-hidden rounded-md p-0">
                        <div className="flex items-center gap-3 border-b px-4 py-5">
                            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                                {initials}
                            </span>
                            <div className="flex min-w-0 flex-col gap-2">
                                <span className="truncate text-sm font-semibold">{email}</span>
                                {role && (
                                    <Badge variant={role === "admin" ? "default" : "secondary"} className="w-fit rounded-l-none">
                                        {role}
                                    </Badge>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2 p-2">
                            <Button
                                variant="destructive"
                                className="flex-1 text-sm font-medium"
                                onClick={handleLogout}
                                disabled={logoutLoading}
                            >
                                {logoutLoading ? <Loader2 className="size-4 animate-spin" /> : <LogOut className="size-4" />}
                                {logoutLoading ? "Signing out..." : "Logout"}
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </nav>
        </header>
    );
}

export default Navbar