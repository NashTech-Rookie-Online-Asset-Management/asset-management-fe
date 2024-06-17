import React from 'react';

type Props = {};

export const metadata = {
  title: 'Create an Asset',
};

function CreateAssetLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default CreateAssetLayout;
