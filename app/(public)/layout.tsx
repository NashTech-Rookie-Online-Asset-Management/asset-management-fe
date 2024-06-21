import React from 'react';

import PublicHeader from './components/header';

function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="flex min-h-dvh h-dvh max-h-dvh flex-col">
      <PublicHeader />
      {children}
    </div>
  );
}

export default PublicLayout;
