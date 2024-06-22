import React from 'react';

import PublicHeader from './components/header';

function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-dvh max-h-dvh min-h-dvh flex-col">
      <PublicHeader />
      {children}
    </div>
  );
}

export default PublicLayout;
