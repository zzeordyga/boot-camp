"use client";

import { useAuth } from "@/components/provider/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const formatDate = (value?: string | null) => value ? new Date(value).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short"
}) : "-";

const ProfilePage = () => {
    const { user, role } = useAuth();

    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">User Panel</h1>
                <p className="text-sm text-muted-foreground">Accessible to any authenticated user.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Account information</CardTitle>
                    <CardDescription>Details of the account you are signed in with.</CardDescription>
                </CardHeader>
                <CardContent>
                    <dl className="divide-y text-sm">
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                            <dt className="text-muted-foreground">Email</dt>
                            <dd className="break-all font-medium">{user?.email ?? "-"}</dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                            <dt className="text-muted-foreground">Role</dt>
                            <dd>
                                {role ? (
                                    <Badge variant={role === "admin" ? "default" : "secondary"}>{role}</Badge>
                                ) : (
                                    "-"
                                )}
                            </dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                            <dt className="text-muted-foreground">User ID</dt>
                            <dd className="break-all font-medium">{user?.uid ?? "-"}</dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                            <dt className="text-muted-foreground">Created at</dt>
                            <dd className="font-medium">{formatDate(user?.metadata.creationTime)}</dd>
                        </div>
                        <div className="flex flex-col gap-1 py-3 sm:flex-row sm:justify-between sm:gap-4">
                            <dt className="text-muted-foreground">Last sign-in</dt>
                            <dd className="font-medium">{formatDate(user?.metadata.lastSignInTime)}</dd>
                        </div>
                    </dl>
                </CardContent>
            </Card>
        </section>
    );
};

export default ProfilePage;