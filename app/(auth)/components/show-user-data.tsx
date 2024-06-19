'use client';

import React from 'react';

import useProfile from '@/features/auth/useProfile';

function ShowUserData() {
  const { data } = useProfile();
  return (
    <div>
      <p>Id: {data?.id || 'Unauthenticated'}</p>
      <p>Username: {data?.username || 'Unauthenticated'}</p>
      <p>Staff Code: {data?.staffCode || 'Unauthenticated'}</p>
      <p>Account Status: {data?.status || 'Unauthenticated'}</p>
      <p>Account Type: {data?.type || 'Unauthenticated'}</p>
    </div>
  );
}

export default ShowUserData;
