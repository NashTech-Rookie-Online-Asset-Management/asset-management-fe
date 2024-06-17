import React from 'react';

type Props = {};

export const metadata = {
  title: 'Assignments',
};

function AssignmentLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default AssignmentLayout;
