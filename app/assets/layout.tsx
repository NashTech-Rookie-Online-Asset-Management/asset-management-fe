import React from 'react';

type Props = {};

export const metadata = {
  title: 'Assets',
};

function AssetLayout({ children }: React.PropsWithChildren<Props>) {
  return <div>{children}</div>;
}

export default AssetLayout;
