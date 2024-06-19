'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

import { LoadingButton } from '@/components/custom/loading-button';
import useLogout from '@/features/auth/useLogout';

function LogoutButton({
  className,
  variant,
}: {
  className?: string;
  variant:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | null
    | undefined;
}) {
  const router = useRouter();
  const { isSuccess, isPending, mutate: logout } = useLogout();

  React.useEffect(() => {
    if (isSuccess) {
      router.refresh();
    }
  }, [isSuccess, router]);

  return (
    <LoadingButton
      isLoading={isPending}
      onClick={() => logout()}
      className={className}
      size="sm"
      variant={variant}
    >
      <LogOut className="mr-2 size-4" />
      <span>Log out</span>
    </LoadingButton>
  );
}

export default LogoutButton;
