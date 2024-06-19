'use client';

import { useEffect, useState } from 'react';

import useProfile from '@/features/auth/useProfile';

import ChangePasswordFirstTimeDialog from './components/change-password-first-time-dialog';

export default function Home() {
  const { data } = useProfile();
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (data) {
      if (data.status === 'CREATED') setDialogOpen(true);
      else setDialogOpen(false);
    }
  }, [data]);

  return (
    <main className="container flex flex-col items-center justify-between pb-24">
      <p>Online Asset Management</p>
      <div>
        <p>Id: {data?.id || 'Unauthenticated'}</p>
        <p>Username: {data?.username || 'Unauthenticated'}</p>
        <p>Staff Code: {data?.staffCode || 'Unauthenticated'}</p>
        <p>Account Status: {data?.status || 'Unauthenticated'}</p>
        <p>Account Type: {data?.type || 'Unauthenticated'}</p>
      </div>
      <ChangePasswordFirstTimeDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </main>
  );
}
