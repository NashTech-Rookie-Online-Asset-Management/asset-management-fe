'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { PasswordInput } from '@/components/custom/password-input';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
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
import useChangePassword from '@/features/auth/useChangePassword';
import useProfile from '@/features/auth/useProfile';

import { changePasswordSchema } from '../schema';

function ChangePasswordDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });
  const {
    mutate: submit,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = useChangePassword();
  const { refetch: refetchProfile } = useProfile();

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    submit(values);
  }

  const oldPasswordValue = form.watch('oldPassword');
  const oldPasswordError = form.getFieldState('oldPassword').error;
  const newPasswordValue = form.watch('newPassword');
  const newPasswordError = form.getFieldState('newPassword').error;

  React.useEffect(() => {
    if (!oldPasswordError) return;
    if (!oldPasswordValue) {
      form.clearErrors('oldPassword');
    }
  }, [oldPasswordValue, form, oldPasswordError]);
  React.useEffect(() => {
    if (!newPasswordError) return;
    if (!newPasswordValue) {
      form.clearErrors('newPassword');
    }
  }, [newPasswordValue, form, newPasswordError]);

  const handleCancelDialog = () => {
    onOpenChange(false);
  };

  useEffect(() => {
    if (!isOpen) form.reset();
  }, [form, isOpen]);
  useEffect(() => {
    if (isError && error) {
      form.setError('oldPassword', { message: error.response?.data?.message });
    }

    if (isSuccess) {
      refetchProfile();
      form.reset();
    }
  }, [isError, error, isSuccess, refetchProfile, form, onOpenChange]);

  useEffect(() => {
    reset();
  }, [isOpen, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        {isSuccess ? (
          <>
            <div className="pb-4">
              Your password has been changed successfully!
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary" onClick={handleCancelDialog}>
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="oldPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <span className="required">Old Password</span>
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="your old password"
                        autoFocus
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
              <DialogFooter>
                <LoadingButton
                  type="submit"
                  isLoading={isPending}
                  disabled={
                    !(
                      form.getValues('oldPassword') &&
                      form.getValues('newPassword')
                    )
                  }
                >
                  Save
                </LoadingButton>
                <DialogClose asChild>
                  <Button variant="secondary" onClick={handleCancelDialog}>
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
