import { useMutation, useQueryClient } from '@tanstack/react-query';

import userApi from './user.service';
import type { CreateUserRequest, CreateUserResponse } from './user.types';

function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation<CreateUserResponse, AppAxiosError, CreateUserRequest>({
    mutationFn: (data: CreateUserRequest) => userApi.postUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['users', data.username, { pinned: true }],
        data,
      );
    },
  });
}

export default useCreateUser;
