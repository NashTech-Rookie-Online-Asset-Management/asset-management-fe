'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
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
  } = useChangePassword();
  const { refetch: refetchProfile } = useProfile();

  function onSubmit(values: z.infer<typeof changePasswordSchema>) {
    submit(values);
  }

  const handleCancelDialog = () => {
    form.reset();
    onOpenChange(false);
  };
  useEffect(() => {
    if (isError && error) {
      form.setError('oldPassword', { message: error.response?.data?.message });
    }

    if (isSuccess) {
      refetchProfile();
      form.reset();
      toast({
        title: 'Change Password',
        description: 'Your password has been changed successfully',
        variant: 'success',
      });
      onOpenChange(false);
    }
  }, [isError, error, isSuccess, refetchProfile, form, onOpenChange]);

  return (
    <Dialog open={isOpen} modal>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="oldPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your old password"
                      type="password"
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
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your new password"
                      type="password"
                      autoFocus
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="mt-10">
              <LoadingButton type="submit" isLoading={isPending}>
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
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordDialog;
