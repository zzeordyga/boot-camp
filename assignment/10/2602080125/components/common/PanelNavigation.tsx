"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, UserCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useAuth, type Role } from "@/components/provider/AuthProvider";
import { cn } from "@/lib/utils";

interface NavItem {
    href: string;
    label: string;
    icon: LucideIcon;
    requiredRole?: Role;
}

const NAV_ITEMS: NavItem[] = [
    {
        href: "/user/profile",
        label: "User Access",
        icon: UserCircle,
    },
    {
        href: "/admin/dashboard",
        label: "Admin Access",
        icon: ShieldCheck,
        requiredRole: "admin"
    },
];

const PanelNavigation = () => {
    const { role } = useAuth();
    const pathname = usePathname();

    const items = NAV_ITEMS.filter((item) => !item.requiredRole || item.requiredRole === role);

    return (
        <nav
            aria-label="panel-navigation"
            className="mx-auto flex w-full max-w-7xl items-center gap-2 overflow-x-auto px-6 py-3"
        >
            {items.map((item) => {
                const active = pathname === item.href;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent",
                            active ? "bg-accent font-medium text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <Icon className="size-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}
export default PanelNavigation