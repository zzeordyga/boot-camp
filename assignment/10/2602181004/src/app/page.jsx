'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { Pending } from '@/components/RequireAuth';

export default function Home() {
  const { status, profile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === 'guest') router.replace('/login');
    if (status === 'ready') router.replace(profile?.role === 'admin' ? '/admin/dashboard' : '/user/profile');
  }, [status, profile, router]);

  return <Pending text="Checking your session…" />;
}
