import React from 'react';

type Props = {};

export const metadata = {
  title: 'Users',
};

function UserLayout({ children }: React.PropsWithChildren<Props>) {
  return <div className="py-8">{children}</div>;
}

export default UserLayout;
