'use client';

import { DialogClose } from '@radix-ui/react-dialog';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
/* eslint-disable no-nested-ternary */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import useDeleteUser from '@/features/user/useDeleteUser';
import type { User } from '@/features/user/user.types';

export default function DeleteUserDialog({
  user,
  isOpen,
  onOpenChange,
  refetchUsers,
}: {
  user: User;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  refetchUsers: () => void;
}) {
  const { mutateAsync: deleteUser, isPending } = useDeleteUser();

  const handleDeleteUser = async () => {
    await deleteUser(user.staffCode);
    toast({
      title: 'User deleted',
      description: `User ${user.username} has been deleted successfully`,
      variant: 'success',
      duration: 1500,
    });
    refetchUsers();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} modal onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton={user.canDisable}>
        <DialogHeader>
          <DialogTitle>
            {user.canDisable ? 'Are you sure?' : 'Can not disable user'}
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          {user.canDisable ? (
            <>
              <p>Do you want to disable this user?</p>

              <DialogFooter className="mt-4 flex sm:justify-start">
                <LoadingButton
                  data-id="delete-button"
                  type="submit"
                  isLoading={isPending}
                  onClick={handleDeleteUser}
                >
                  Disable
                </LoadingButton>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
                    data-id="change-password-cancel-button"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <p>
              There are valid assignments belonging to this user.
              <br />
              Please close all assignments before disabling user.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
