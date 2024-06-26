'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import useProfile from '@/features/auth/useProfile';
import useEditUser from '@/features/user/useEditUser';
import useGetUser from '@/features/user/useGetUser';
import { AccountType, Gender } from '@/lib/@types/api';
import { normalizeText } from '@/lib/utils';

import { editUserFormSchema } from './schema';

type Props = {
  id: string;
};
function EditUserForm({ id }: Props) {
  const router = useRouter();
  const {
    data: userData,
    isPending: isUserPending,
    isSuccess: isUserSuccess,
    isError: isUserError,
    error: userError,
  } = useGetUser(id);
  const {
    mutateAsync: editUser,
    isPending: isEditUserPending,
    isSuccess: isEditUserSuccess,
  } = useEditUser();
  const { data: user, isSuccess: isLoggedInSuccess } = useProfile();
  const form = useForm<z.infer<typeof editUserFormSchema>>({
    resolver: zodResolver(editUserFormSchema),
  });

  useEffect(() => {
    if (isUserError && userError) {
      if (userError instanceof AxiosError) {
        toast({
          title: 'Error',
          description: userError?.response?.data?.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: userError.message,
          variant: 'destructive',
        });
      }
      router.push('/users');
    }
  }, [isUserError, router]);

  useEffect(() => {
    if (isUserSuccess && isLoggedInSuccess) {
      if (
        user?.type === userData?.type ||
        userData?.type === AccountType.ROOT
      ) {
        toast({
          title: 'User cannot be edited',
          description:
            'Cannot edit user with the same type or root as the logged-in user',
          variant: 'destructive',
        });
        router.push('/users');
      }
    }
  }, [isUserSuccess, isLoggedInSuccess, user, userData, router]);

  useEffect(() => {
    if (!userData) return;

    form.reset({
      firstName: userData.firstName,
      lastName: userData.lastName,
      dob: new Date(userData?.dob).toISOString().split('T')[0],
      gender: userData.gender,
      joinedAt: new Date(userData?.joinedAt).toISOString().split('T')[0],
      type: userData.type as AccountType.ADMIN | AccountType.STAFF,
      location: userData.location,
    });
  }, [userData, form]);

  async function onSubmit(values: z.infer<typeof editUserFormSchema>) {
    await editUser({
      userStaffCode: userData!.staffCode,
      data: values,
    });

    toast({
      title: 'Edit User',
      description: `Successfully edited user`,
      variant: 'success',
    });
    router.push(`/users?new=true`);
  }

  if (!userData && !isUserPending) {
    return <div>User not found</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Input
                    placeholder="Type in user first name"
                    autoFocus
                    {...field}
                    disabled
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Input
                    placeholder="Type in user last name"
                    {...field}
                    disabled
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Input type="date" className="block" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <RadioGroup className="flex" onValueChange={field.onChange}>
                    {Object.values(Gender).map((e) => (
                      <div
                        className="flex items-center space-x-2"
                        data-id={`radio_group_item_gender_${e}`}
                        key={`radio_group_item_gender_${e}`}
                      >
                        <RadioGroupItem checked={field.value === e} value={e} />
                        <Label htmlFor={`gender_${e}`}>
                          {normalizeText(e)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="joinedAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joined Date</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Input type="date" className="block" {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                {isUserPending ? (
                  <Skeleton className="h-8 w-full rounded-md" />
                ) : (
                  <Select
                    value={field.value || userData?.type}
                    onValueChange={field.onChange}
                    disabled={user?.type === AccountType.ADMIN}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {user?.type === AccountType.ROOT && (
                        <SelectItem value={AccountType.ADMIN}>
                          {normalizeText(AccountType.ADMIN)}
                        </SelectItem>
                      )}
                      <SelectItem value={AccountType.STAFF}>
                        {normalizeText(AccountType.STAFF)}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-2 flex w-full justify-end space-x-2">
          <LoadingButton
            type="submit"
            isLoading={isEditUserPending}
            disabled={isEditUserSuccess || isEditUserPending || isUserPending}
          >
            Save
          </LoadingButton>
          <Button
            variant="secondary"
            asChild
            onClick={() => router.replace('/users')}
          >
            <Link href="/users">Cancel</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default EditUserForm;
