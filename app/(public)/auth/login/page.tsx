import React from 'react';

import LoginForm from './login-form';

export const metadata = {
  title: 'Login',
};

function SigninPage() {
  return (
    <div className="container mx-auto flex flex-1 items-center justify-center">
      <LoginForm />
    </div>
  );
}

export default SigninPage;
