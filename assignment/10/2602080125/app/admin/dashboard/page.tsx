const AdminDashboardPage = () => {
    return (
        <section className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">Accessible only to users with the admin role.</p>
            </div>

            <div className="flex min-h-100 items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground border-primary">
                Content goes here
            </div>
        </section>
    );
}
export default AdminDashboardPage;