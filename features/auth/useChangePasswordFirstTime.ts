import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import authApi from './auth.service';
import type { ChangePasswordFirstTimeRequest } from './auth.types';

function useChangePasswordFirstTime() {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError, ChangePasswordFirstTimeRequest>(
    {
      mutationFn: (data: ChangePasswordFirstTimeRequest) =>
        authApi.changePasswordFirstTime(data),
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["assignments"]
          })
        }
    },
  );
}

export default useChangePasswordFirstTime;
