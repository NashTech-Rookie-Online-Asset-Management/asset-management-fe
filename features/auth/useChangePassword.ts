import { useMutation } from '@tanstack/react-query';

import authApi from './auth.service';
import type { ChangePasswordRequest } from './auth.types';

function useChangePassword() {
  return useMutation<ApiMessage, AppAxiosError, ChangePasswordRequest>({
    mutationFn: (data: ChangePasswordRequest) => authApi.changePassword(data),
  });
}

export default useChangePassword;
