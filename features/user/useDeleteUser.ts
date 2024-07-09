import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import userApi from './user.service';

function useDeleteUser(staffCode: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError>({
    mutationFn: () => userApi.deleteUser(staffCode),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['users', staffCode] });
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export default useDeleteUser;
