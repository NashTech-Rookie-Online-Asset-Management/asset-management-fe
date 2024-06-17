import React from 'react';

type Props = {};

export const metadata = {
  title: 'Edit User',
};

function EditUserLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default EditUserLayout;
