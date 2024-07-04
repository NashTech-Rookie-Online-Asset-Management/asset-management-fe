import React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage User',
};

function UserLayout({ children }: React.PropsWithChildren<Props>) {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">User List</h3>
      {children}
    </main>
  );
}

export default UserLayout;
