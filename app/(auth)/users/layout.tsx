import React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage User',
};

function UserLayout({ children }: React.PropsWithChildren<Props>) {
  return children;
}

export default UserLayout;
