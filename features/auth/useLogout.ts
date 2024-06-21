import { useMutation } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import authApi from './auth.service';

function useLogout() {
  return useMutation<ApiMessage, AppAxiosError>({
    mutationFn: () => authApi.logout(),
  });
}

export default useLogout;
