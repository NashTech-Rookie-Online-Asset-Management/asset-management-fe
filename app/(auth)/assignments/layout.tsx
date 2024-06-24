import type React from 'react';

type Props = {};

export const metadata = {
  title: 'Assignments',
};

export default function AssignmentLayout({
  children,
}: React.PropsWithChildren<Props>) {
  return children;
}
