import { useMutation } from '@tanstack/react-query';

import userApi from './user.service';
import type { UpdateUserRequest, UpdateUserResponse } from './user.types';

function useEditUser() {
  return useMutation<
    UpdateUserResponse,
    AppAxiosError,
    { userStaffCode: string; data: UpdateUserRequest }
  >({
    mutationFn: ({ userStaffCode, data }) =>
      userApi.updateUser(userStaffCode, data),
  });
}

export default useEditUser;
