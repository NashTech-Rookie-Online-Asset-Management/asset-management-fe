import React from 'react';

type Props = {};

export const metadata = {
  title: 'Create an Assignment',
};

function CreateAssignmentLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default CreateAssignmentLayout;
