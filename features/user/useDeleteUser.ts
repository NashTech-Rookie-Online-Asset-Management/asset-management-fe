import { useMutation } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import userApi from './user.service';

function useDeleteUser() {
  return useMutation<ApiMessage, AppAxiosError, string>({
    mutationFn: (staffCode: string) => userApi.deleteUser(staffCode),
  });
}

export default useDeleteUser;
