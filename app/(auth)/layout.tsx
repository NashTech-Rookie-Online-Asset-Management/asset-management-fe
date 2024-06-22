import React from 'react';

import AuthHeader from './components/header';
import Sidebar from './components/sidebar';

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AuthHeader />
      <div className="container mx-auto flex space-x-8 pb-24 pt-4">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
