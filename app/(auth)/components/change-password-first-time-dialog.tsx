'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useOnClickOutside } from 'usehooks-ts';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { PasswordInput } from '@/components/custom/password-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import useChangePasswordFirstTime from '@/features/auth/useChangePasswordFirstTime';
import useProfile from '@/features/auth/useProfile';

import { changePasswordFirstTimeSchema } from '../schema';

function ChangePasswordFirstTimeDialog() {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const form = useForm<z.infer<typeof changePasswordFirstTimeSchema>>({
    resolver: zodResolver(changePasswordFirstTimeSchema),
    defaultValues: {
      newPassword: '',
    },
  });
  const { mutate: submit, isPending, isSuccess } = useChangePasswordFirstTime();
  const { refetch: refetchProfile, data: profile } = useProfile();
  const [isOpen, setIsOpen] = React.useState(false);

  function onSubmit(values: z.infer<typeof changePasswordFirstTimeSchema>) {
    submit(values);
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (isSuccess) {
      setIsOpen(open);
    } else {
      setIsOpen(true);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      refetchProfile();
    }
  }, [isSuccess, refetchProfile]);

  React.useEffect(() => {
    if (profile) {
      if (profile.status === 'CREATED') setIsOpen(true);
      else setIsOpen(false);
    }
  }, [profile]);

  useOnClickOutside(modalRef, (e) => {
    e.preventDefault();
    form.setError(
      'newPassword',
      {
        message: 'You need to change your password first!',
      },
      { shouldFocus: true },
    );
  });

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange} modal>
      <DialogContent hideCloseButton ref={modalRef}>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            This is the first time you logged in. You have to change your to
            continue.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="required">New Password</span>
                  </FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="your new password"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-10">
              <LoadingButton
                type="submit"
                isLoading={isPending}
                disabled={isSuccess || !form.formState.isValid}
              >
                Change Password
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordFirstTimeDialog;
