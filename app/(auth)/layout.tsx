import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

import authApi from '@/features/auth/auth.service';
import CookieKeys from '@/lib/constants/cookieKeys';

import ChangePasswordFirstTimeDialog from './components/change-password-first-time-dialog';
import ClientReady from './components/client-ready';
import AuthHeader from './components/header';
import ShowUserData from './components/show-user-data';
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
      <AuthHeader
        initialProfile={profile}
        className="sticky inset-x-0 top-0 z-50"
      />
      <div className="container mx-auto flex flex-col pb-24 pt-4 lg:flex-row lg:space-x-8 lg:pt-10">
        <nav className="relative hidden w-0 lg:block lg:w-64 lg:max-w-64">
          <Sidebar className="fixed top-0 max-w-64 pt-24" />
        </nav>
        <div className="flex-1">
          <ClientReady>{children}</ClientReady>
        </div>
      </div>
      <ShowUserData />
      <ChangePasswordFirstTimeDialog initialProfile={profile} />
    </div>
  );
}

export default AuthLayout;
