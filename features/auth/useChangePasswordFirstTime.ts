import { useMutation } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import authApi from './auth.service';
import type { ChangePasswordFirstTimeRequest } from './auth.types';

function useChangePasswordFirstTime() {
  return useMutation<ApiMessage, AppAxiosError, ChangePasswordFirstTimeRequest>(
    {
      mutationFn: (data: ChangePasswordFirstTimeRequest) =>
        authApi.changePasswordFirstTime(data),
    },
  );
}

export default useChangePasswordFirstTime;
