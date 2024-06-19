import React from 'react';

import PublicHeader from './components/header';

function PublicLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <PublicHeader />
      {children}
    </div>
  );
}

export default PublicLayout;
