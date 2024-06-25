'use client';

import { useRouter } from 'next-nprogress-bar';
import { useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CreateUserResponse } from '@/features/user/user.types';

export type CreateUserResultDialogProps = {
  userData: CreateUserResponse;
};

function CreateUserResultDialog(props: CreateUserResultDialogProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const handleConfirmDialog = () => {
    router.replace('/users?new=true');
  };

  useOnClickOutside(modalRef, (e) => {
    e.preventDefault();
    handleConfirmDialog();
  });

  return (
    <Dialog open modal>
      <DialogContent ref={modalRef}>
        <DialogHeader>
          <DialogTitle>User created</DialogTitle>
          <DialogClose />
          <DialogDescription>
            Warning: You will not be able to see this information again after
            closing this window.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-3">
          <div>
            <Label>
              <span>Username</span>
            </Label>
            <Input value={props.userData?.username} readOnly />
          </div>
          <div>
            <Label>
              <span>Password</span>
            </Label>
            <PasswordInput value={props.userData?.password} readOnly />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="mt-3 w-full"
            disabled={false}
            onClick={handleConfirmDialog}
            data-id="confirm-button"
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserResultDialog;
