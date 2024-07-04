import React from 'react';

type Props = {};

export const metadata = {
  title: 'Manage Asset',
};

function AssetLayout({ children }: React.PropsWithChildren<Props>) {
  return (
    <main className="w-full py-8">
      <h3 className="mb-8 text-xl font-bold text-primary">Asset List</h3>
      {children}
    </main>
  );
}

export default AssetLayout;
