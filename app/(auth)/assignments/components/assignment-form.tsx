'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { AssignmentState } from '@/lib/@types/api';

import SelectAssetModal from './select-asset-modal';
import SelectUserModal from './select-user-modal';

const formSchema = z.object({
  assignedTo: z.object({
    staffCode: z.string(),
    name: z.string(),
  }),
  asset: z.object({
    assetCode: z.string(),
    name: z.string(),
  }),
  assignedDate: z.string().date(),
  note: z.string().optional(),
  state: z.nativeEnum(AssignmentState).optional(),
});

export type FormSchema = z.infer<typeof formSchema>;

const defaultFormValues: FormSchema = {
  assignedTo: {
    staffCode: '',
    name: '',
  },
  asset: {
    assetCode: '',
    name: '',
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

  return (
    <>
      <SelectUserModal
        open={openUserModal}
        setOpen={setOpenUserModal}
        onSelect={(user) => {
          form.setValue('assignedTo', {
            ...user,
            name: `${user.firstName} ${user.lastName}`,
          });
        }}
        defaultValue={defaultValue?.assignedTo.staffCode}
      />

      <SelectAssetModal
        open={openAssetModal}
        setOpen={setOpenAssetModal}
        defaultValue={defaultValue?.asset.assetCode}
        onSelect={(asset) => form.setValue('asset', asset)}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-4"
        >
          <FormField
            control={form.control}
            name="assignedTo.name"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel>
                  <span className="required">User</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input onClick={openUserModalHandler} readOnly {...field} />
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
                  <Input type="date" className="block" autoFocus {...field} />
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
                  <Textarea {...field} />
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
              <Button variant="outline" disabled={isPending}>
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </>
  );
}
