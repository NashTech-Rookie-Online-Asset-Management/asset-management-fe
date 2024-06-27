import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import authApi from '@/features/auth/auth.service';
import CookieKeys from '@/lib/constants/cookieKeys';

import AuthHeader from './components/header';
import Sidebar from './components/sidebar';

async function getProfile() {
  const accessToken = cookies().get(CookieKeys.ACCESS_TOKEN)?.value!;
  authApi.setBearerToken(accessToken).useServer();

  try {
    return await authApi.getProfile();
  } catch (error) {
    return redirect('/auth/login');
  }
}

async function AuthLayout({ children }: React.PropsWithChildren) {
  const profile = await getProfile();

  return (
    <div>
      <AuthHeader initialProfile={profile} />
      <div className="container mx-auto flex flex-col pb-24 pt-4 md:flex-row md:space-x-8 md:pt-10">
        <nav className="hidden w-0 md:block md:w-64">
          <Sidebar />
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
