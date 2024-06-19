import { useMutation } from '@tanstack/react-query';

import authApi from './auth.service';
import type { AuthUserResponse, LoginRequest } from './auth.types';

function useLogin() {
  return useMutation<AuthUserResponse, AppAxiosError, LoginRequest>({
    mutationFn: (data: LoginRequest) => authApi.login(data),
  });
}

export default useLogin;
