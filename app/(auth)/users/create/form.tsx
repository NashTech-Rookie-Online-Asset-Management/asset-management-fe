/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next-nprogress-bar';
import { useEffect, useState } from 'react';
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
import useProfile from '@/features/auth/useProfile';
import useCreateUser from '@/features/user/useCreateUser';
import { AccountType, Gender, Location } from '@/lib/@types/api';
import { getLocationText, normalizeText } from '@/lib/utils';

import CreateUserResultDialog from './result-dialog';
import { createUserFormSchema } from './schema';

function CreateUserForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createUserFormSchema>>({
    resolver: zodResolver(createUserFormSchema),
  });
  const firstName = form.watch('firstName');
  const lastName = form.watch('lastName');
  const dob = form.watch('dob');
  const gender = form.watch('gender');
  const joinedAt = form.watch('joinedAt');
  const type = form.watch('type');
  const location = form.watch('location');

  const {
    mutateAsync: createUser,
    isPending,
    isSuccess,
    data,
  } = useCreateUser();
  const { data: user } = useProfile();

  const [saveButtonEnabled, setSaveButtonEnabled] = useState(false);

  async function onSubmit(values: z.infer<typeof createUserFormSchema>) {
    await createUser(values);
  }

  function checkSaveButtonEnabled(): boolean {
    const commonFieldsFilled =
      firstName && lastName && dob && gender && joinedAt && type;

    if (user?.type === AccountType.ROOT)
      return !!(commonFieldsFilled && location);
    return !!commonFieldsFilled;
  }

  useEffect(() => {
    form.reset();
  }, [form, isSuccess]);

  useEffect(() => {
    setSaveButtonEnabled(checkSaveButtonEnabled());
  }, [firstName, lastName, dob, gender, joinedAt, type, location]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="required">First Name</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Type in user first name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {' '}
                  <span className="required">Last Name</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Type in user last name" {...field} />
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
                <FormLabel>
                  <span className="required">Date of Birth</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" className="block" {...field} />
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
                <FormLabel>
                  <span className="required">Gender</span>
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    className="flex gap-8"
                    onValueChange={field.onChange}
                  >
                    {Object.values(Gender).map((e) => (
                      <div
                        className="flex items-center space-x-2"
                        data-id={`radio-group-item-gender-${e}`}
                        key={`radio_group_item_gender_${e}`}
                      >
                        <RadioGroupItem value={e} />
                        <Label htmlFor={`gender_${e}`}>
                          {normalizeText(e)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
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
                <FormLabel>
                  <span className="required">Joined Date</span>
                </FormLabel>
                <FormControl>
                  <Input type="date" className="block" {...field} />
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
                <FormLabel>
                  <span className="required">Type</span>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} data-id="type">
                    <SelectTrigger>
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                    <SelectContent>
                      {user?.type === AccountType.ROOT && (
                        <SelectItem value={AccountType.ADMIN} data-id="admin">
                          {normalizeText(AccountType.ADMIN)}
                        </SelectItem>
                      )}
                      <SelectItem value={AccountType.STAFF} data-id="staff">
                        {normalizeText(AccountType.STAFF)}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {user?.type === AccountType.ROOT && (
            <FormField
              control={form.control}
              name="location"
              data-id="create-user-form-item-location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.values(Location).map((e) => (
                          <SelectItem
                            key={e}
                            value={e}
                            data-id={`create-user-form-item-location-item-${e}`}
                          >
                            {getLocationText(e)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="mt-3 flex w-full justify-end space-x-2">
            <LoadingButton
              data-id="create-submit-button"
              type="submit"
              isLoading={isPending}
              disabled={!saveButtonEnabled}
            >
              Save
            </LoadingButton>
            <Button
              variant="secondary"
              onClick={() => router.back()}
              data-id="create-cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
      {isSuccess && <CreateUserResultDialog userData={data} />}
    </>
  );
}

export default CreateUserForm;
