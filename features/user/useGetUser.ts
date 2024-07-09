import { useQuery, useQueryClient } from '@tanstack/react-query';

import userApi from './user.service';
import type { User } from './user.types';

type GetUserOptions = {
  pinned?: boolean;
  initialData?: User;
};

function useGetUser(
  staffCode: string,
  { pinned, initialData }: GetUserOptions = {},
) {
  const queryClient = useQueryClient();
  const queryKey = pinned
    ? ['users', staffCode, { pinned }]
    : ['users', staffCode];
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, userStaffCode] }) => {
      if (pinned) {
        return queryClient.getQueryData<User>(queryKey);
      }
      return userApi.getUser(userStaffCode as string);
    },
    initialData: () => initialData || queryClient.getQueryData<User>(queryKey),
  });
}

export default useGetUser;
