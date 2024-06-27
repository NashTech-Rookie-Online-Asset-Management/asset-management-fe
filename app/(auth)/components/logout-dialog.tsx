'use client';

import { useRouter } from 'next-nprogress-bar';
import React from 'react';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import useLogout from '@/features/auth/useLogout';

function LogoutDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const router = useRouter();
  const { isSuccess, isPending, mutateAsync: logout } = useLogout();

  async function handleOnClick() {
    await logout();
    router.refresh();
    window.location.reload();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>
        <div className="pb-4">Do you want to log out?</div>
        <DialogFooter className="flex flex-col items-center justify-center gap-2 md:flex-row">
          <LoadingButton
            data-id="logout-confirm-button"
            isLoading={isPending}
            disabled={isSuccess || isPending}
            onClick={() => handleOnClick()}
            className="w-full md:w-fit"
            size="sm"
          >
            <span>Log out</span>
          </LoadingButton>
          <DialogClose asChild>
            <Button
              data-id="logout-cancel-button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="w-full md:w-fit"
              size="sm"
            >
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default LogoutDialog;
