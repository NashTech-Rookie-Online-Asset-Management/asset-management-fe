'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon, Search } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useCreateAssignment } from '@/features/assignment/assignment.hook';
import { cn } from '@/lib/utils';

import SelectAssetModal from './select-asset-modal';
import SelectUserModal from './select-user-modal';

const formSchema = z.object({
  staffCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  assetCode: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  assignedDate: z.date(),
  note: z.string().optional(),
});

export default function AssignmentForm() {
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openAssetModal, setOpenAssetModal] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      staffCode: '',
      assetCode: '',
      note: '',
      assignedDate: new Date(),
    },
  });

  const { mutate, isSuccess, isPending } = useCreateAssignment();

  // Redirect to assignments page after success
  if (isSuccess) router.push('/assignments');

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  const onSelectUser = (user: string) => form.setValue('staffCode', user);
  const onSelectAsset = (asset: string) => form.setValue('assetCode', asset);

  const values = form.watch();
  const isDisbled =
    !values.staffCode || !values.assetCode || !values.assignedDate;

  return (
    <>
      <SelectUserModal
        open={openUserModal}
        setOpen={setOpenUserModal}
        onSelect={onSelectUser}
      />

      <SelectAssetModal
        open={openAssetModal}
        setOpen={setOpenAssetModal}
        onSelect={onSelectAsset}
      />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="max-w-xl space-y-6"
        >
          <FormField
            control={form.control}
            name="staffCode"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-normal">User</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input readOnly {...field} />
                    <Search
                      onClick={() => setOpenUserModal(true)}
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
            name="assetCode"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-normal">Asset</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input readOnly {...field} />
                    <Search
                      onClick={() => setOpenAssetModal(true)}
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
                <FormLabel className="font-normal">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto size-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date <= new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="font-normal">Note</FormLabel>
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
              Submit
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
