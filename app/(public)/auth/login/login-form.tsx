'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next-nprogress-bar';
import React from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import { LoadingButton } from '@/components/custom/loading-button';
import {
  Card,
  CardContent,
  CardDescription,
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
import useLogin from '@/features/auth/useLogin';

import { loginFormSchema } from './schema';

function LoginForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const {
    mutateAsync: login,
    isPending,
    error,
    isError,
    isSuccess,
  } = useLogin();

  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    await login(values);
    router.refresh();
  }

  React.useEffect(() => {
    if (isError && error) {
      form.setError('username', { message: '' }, { shouldFocus: true });
      form.setError('password', { message: error.response?.data?.message });
    }
  }, [error, isError, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your username below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username1" autoFocus {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="secured password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <LoadingButton
              className="w-full"
              type="submit"
              isLoading={isPending}
              disabled={!form.formState.isValid || isSuccess || isPending}
            >
              {isSuccess ? 'Logging you in...' : 'Login'}
            </LoadingButton>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}

export default LoginForm;
