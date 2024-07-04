import type React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage Assignment',
};

export default function AssignmentLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Assignment List</h3>
      {children}
    </main>
  );
}
