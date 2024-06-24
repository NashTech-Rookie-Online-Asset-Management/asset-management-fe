'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next-nprogress-bar';
import { useEffect } from 'react';
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

import CreateUserResultDialog from './create-user-result-dialog';
import { createUserFormSchema } from './schema';

function CreateUserForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof createUserFormSchema>>({
    resolver: zodResolver(createUserFormSchema),
  });
  const {
    mutateAsync: createUser,
    isPending,
    isSuccess,
    data,
  } = useCreateUser();

  async function onSubmit(values: z.infer<typeof createUserFormSchema>) {
    await createUser(values);
  }
  const { data: user } = useProfile();

  useEffect(() => {
    form.reset();
  }, [isSuccess]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-96">
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
                    <FormLabel>First Name</FormLabel>
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
                    <FormLabel>Last Name</FormLabel>
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
                    <FormLabel>Date of Birth</FormLabel>
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
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="flex"
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
                    <FormLabel>Joined Date</FormLabel>
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
                    <FormLabel>Type</FormLabel>
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
            </CardContent>
            <CardFooter className="mt-3 flex gap-4">
              <Button
                className="w-full border-2 border-solid bg-transparent text-gray-900"
                disabled={false}
                onClick={() => router.replace('/users')}
              >
                Cancel
              </Button>
              <LoadingButton
                className="w-full"
                type="submit"
                isLoading={isPending}
                disabled={!form.formState.isValid || isSuccess || isPending}
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
