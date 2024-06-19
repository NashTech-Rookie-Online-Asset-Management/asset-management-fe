import React from 'react';

type Props = {};

export const metadata = {
  title: 'Create a User',
};

function CreateUserLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default CreateUserLayout;
