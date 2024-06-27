'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AccountType } from '@/features/model';
import { AssignmentState } from '@/lib/@types/api';

import type { FormSchema } from './base';
import { formSchema } from './base';
import SelectAssetModal from './select-asset-modal';
import SelectUserModal from './select-user-modal';

const defaultFormValues: FormSchema = {
  assignedTo: {
    staffCode: '',
    fullName: '',
    type: AccountType.STAFF,
  },
  asset: {
    assetCode: '',
    name: '',
    category: {
      name: '',
    },
  },
  assignedDate: new Date().toISOString().split('T')[0],
  note: '',
  state: AssignmentState.WAITING_FOR_ACCEPTANCE,
};

type AssignmentFormProps = {
  defaultValue?: FormSchema;
  isPending: boolean;
  onSubmit: (values: FormSchema) => void;
};

export default function AssignmentForm({
  onSubmit,
  isPending,
  defaultValue,
}: AssignmentFormProps) {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAssetModal, setOpenAssetModal] = useState(false);

  const form = useForm<FormSchema>({
    values: defaultValue || defaultFormValues,
    resolver: zodResolver(formSchema),
    defaultValues: defaultValue || defaultFormValues,
  });

  const values = form.watch();
  const isDisbled =
    !values.assignedTo.staffCode ||
    !values.asset.assetCode ||
    !values.assignedDate ||
    values.state !== AssignmentState.WAITING_FOR_ACCEPTANCE;

  const openUserModalHandler = () => setOpenUserModal(true);
  const openAssetModalHandler = () => setOpenAssetModal(true);

  useLayoutEffect(() => {
    const datePickerInput = document.getElementById(
      'assignedDate',
    ) as HTMLInputElement;
    if (datePickerInput) {
      const [currentDate] = new Date().toISOString().split('T');
      datePickerInput.min = currentDate;
    }
  }, []);

  return (
    <>
      <SelectUserModal
        assignment={defaultValue}
        open={openUserModal}
        setOpen={setOpenUserModal}
        onSelect={(user) => {
          form.setValue('assignedTo', user);
        }}
      />

      <SelectAssetModal
        assignment={defaultValue}
        open={openAssetModal}
        setOpen={setOpenAssetModal}
        onSelect={(asset) => form.setValue('asset', asset)}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <FormField
            control={form.control}
            name="assignedTo.fullName"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  <span className="required">User</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="cursor-pointer"
                      onClick={openUserModalHandler}
                      readOnly
                      {...field}
                    />
                    <Search
                      onClick={openUserModalHandler}
                      className="absolute right-0 top-0 m-2.5 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="asset.name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  <span className="required">Asset</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className="cursor-pointer"
                      onClick={openAssetModalHandler}
                      readOnly
                      {...field}
                    />
                    <Search
                      onClick={openAssetModalHandler}
                      className="absolute right-0 top-0 m-2.5 size-4 cursor-pointer text-muted-foreground transition-colors hover:text-primary"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col space-y-2">
                <FormLabel>
                  <span className="required">Assigned Date</span>
                </FormLabel>
                <FormControl>
                  <Input
                    id="assignedDate"
                    type="date"
                    className="block"
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
            name="note"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Textarea className="min-h-48 resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-4">
            <LoadingButton
              type="submit"
              isLoading={isPending}
              disabled={isDisbled || isPending}
            >
              Save
            </LoadingButton>
            <Link href="/assignments">
              <Button variant="secondary" disabled={isPending}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
