'use client';

import React from 'react';

import useProfile from '@/features/auth/useProfile';

function ShowUserData() {
  const { data } = useProfile();
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <></>;
}

export default ShowUserData;
