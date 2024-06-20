'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
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
  const { isSuccess, isPending, mutateAsync: logout } = useLogout();

  async function handleOnClick() {
    await logout();
    router.refresh();
  }

  return (
    <LoadingButton
      isLoading={isPending}
      disabled={isSuccess}
      onClick={() => handleOnClick()}
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
