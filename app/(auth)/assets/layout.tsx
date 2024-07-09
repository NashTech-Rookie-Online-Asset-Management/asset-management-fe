import type React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage Asset',
};

function AssetLayout({ children }: React.PropsWithChildren<Props>) {
  return children;
}

export default AssetLayout;
