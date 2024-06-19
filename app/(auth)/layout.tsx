import React from 'react';

import AuthHeader from './components/header';
import Sidebar from './components/sidebar';

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AuthHeader />
      <div className="container flex space-x-4 pb-24 pt-4">
        <Sidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
