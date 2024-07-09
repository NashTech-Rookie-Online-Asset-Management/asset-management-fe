import { useMutation, useQueryClient } from '@tanstack/react-query';

import userApi from './user.service';
import type { UpdateUserRequest, UpdateUserResponse } from './user.types';

function useEditUser() {
  const queryClient = useQueryClient();
  return useMutation<
    UpdateUserResponse,
    AppAxiosError,
    { userStaffCode: string; data: UpdateUserRequest }
  >({
    mutationFn: ({ userStaffCode, data }) =>
      userApi.updateUser(userStaffCode, data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['users', data.staffCode, { pinned: true }],
        data,
      );
    },
  });
}

export default useEditUser;
