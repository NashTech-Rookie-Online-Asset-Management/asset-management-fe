import { useMutation } from '@tanstack/react-query';

import userApi from './user.service';
import type { CreateUserRequest, CreateUserResponse } from './user.types';

function useCreateUser() {
  return useMutation<CreateUserResponse, AppAxiosError, CreateUserRequest>({
    mutationFn: (data: CreateUserRequest) => userApi.postUser(data),
  });
}

export default useCreateUser;
