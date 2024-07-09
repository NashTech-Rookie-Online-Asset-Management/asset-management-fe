import type React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage Assignment',
};

export default function AssignmentLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return children;
}
