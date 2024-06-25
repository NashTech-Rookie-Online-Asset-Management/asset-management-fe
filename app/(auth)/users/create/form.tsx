'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
import { normalizeText } from '@/lib/utils';

import CreateUserResultDialog from './result-dialog';
import { createUserFormSchema } from './schema';

function CreateUserForm() {
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-7/12">
            <CardHeader>
              <CardTitle className="text-2xl text-red-700">
                Create New User
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
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
                            data-id={`radio_group_item_gender_${e}`}
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
                      <Select onValueChange={field.onChange}>
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {user?.type === AccountType.ROOT && (
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={Location.HN}>Ha Noi</SelectItem>
                            <SelectItem value={Location.HCM}>
                              Ho Chi Minh
                            </SelectItem>
                            <SelectItem value={Location.DN}>Da Nang</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <p className="text-sm font-medium text-destructive">
                {(form.formState.errors as any)?.general?.message}
              </p>
            </CardContent>
            <CardFooter className="mt-3 flex gap-4">
              <Button
                variant="secondary"
                asChild
                className="w-1/2"
                data-id="cancel-button"
              >
                <Link href="/users">Cancel</Link>
              </Button>
              <LoadingButton
                className="w-1/2"
                type="submit"
                isLoading={isPending}
                disabled={!saveButtonEnabled || isSuccess || isPending}
                data-id="save-button"
              >
                Save
              </LoadingButton>
            </CardFooter>
          </Card>
        </form>
      </Form>
      {isSuccess && <CreateUserResultDialog userData={data} />}
    </>
  );
}

export default CreateUserForm;
