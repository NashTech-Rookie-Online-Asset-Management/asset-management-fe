import React from 'react';

type Props = {};

export const metadata = {
  title: 'Edit Asset',
};

function EditAssetLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default EditAssetLayout;
