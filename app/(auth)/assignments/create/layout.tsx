import React from 'react';

type Props = {};

export const metadata = {
  title: 'Create an Assignment',
};

function CreateAssignmentLayout({ children }: React.PropsWithChildren<Props>) {
  return <div className="pl-12 pt-12">{children}</div>;
}

export default CreateAssignmentLayout;
