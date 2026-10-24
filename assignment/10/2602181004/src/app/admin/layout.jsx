import RequireAuth from '@/components/RequireAuth';

export default function AdminLayout({ children }) {
  return <RequireAuth role="admin">{children}</RequireAuth>;
}
