import React from 'react';

import LoginForm from './login-form';

export const metadata = {
  title: 'Login',
};

function SigninPage() {
  return (
    <div className="container mx-auto">
      <div className="flex items-center justify-center py-24">
        <LoginForm />
      </div>
    </div>
  );
}

export default SigninPage;
