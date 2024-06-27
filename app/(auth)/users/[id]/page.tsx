import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import authApi from '@/features/auth/auth.service';
import userApi from '@/features/user/user.service';
import CookieKeys from '@/lib/constants/cookieKeys';

import EditUserForm from './edit-user-form';

export const metadata = {
  title: 'Edit User',
};

type Props = {
  params: { id: string };
};

async function getUser(id: string) {
  const accessToken = cookies().get(CookieKeys.ACCESS_TOKEN)?.value!;
  userApi.setBearerToken(accessToken).useServer();
  authApi.setBearerToken(accessToken).useServer();

  try {
    const user = await userApi.getUser(id);
    const me = await authApi.getProfile();

    if (user.type === me.type) {
      throw new Error();
    }

    return user;
  } catch (error) {
    return redirect('/users');
  }
}

async function EditUserPage({ params }: Props) {
  await getUser(params.id);

  return (
    <div className="w-full max-w-xl py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Edit User</h3>
      <EditUserForm id={params.id} />
    </div>
  );
}

export default EditUserPage;
