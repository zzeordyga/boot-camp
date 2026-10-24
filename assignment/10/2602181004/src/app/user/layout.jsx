import RequireAuth from '@/components/RequireAuth';

export default function UserLayout({ children }) {
  return <RequireAuth>{children}</RequireAuth>;
}
