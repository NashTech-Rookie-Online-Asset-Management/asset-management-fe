import React from 'react';

import AuthHeader from './components/header';
import Sidebar from './components/sidebar';

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AuthHeader />
      <div className="container mx-auto flex flex-col pb-24 pt-4 md:flex-row md:space-x-8 md:pt-10">
        <nav className="hidden w-0 md:block md:w-64">
          <Sidebar />
        </nav>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default AuthLayout;
