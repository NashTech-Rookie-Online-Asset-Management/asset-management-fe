import React from 'react';

type Props = {};

export const metadata = {
  title: 'Edit Assignment',
};

function EditAssignmentLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default EditAssignmentLayout;
