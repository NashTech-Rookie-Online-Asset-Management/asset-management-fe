import React from 'react';

import AuthHeader from './components/header';

function AuthLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <AuthHeader />
      {children}
    </div>
  );
}

export default AuthLayout;
