import React from 'react';

type Props = {};

export const metadata = {
  title: 'Assets',
};

function AssetLayout({ children }: React.PropsWithChildren<Props>) {
  return <div className="py-8">{children}</div>;
}

export default AssetLayout;
