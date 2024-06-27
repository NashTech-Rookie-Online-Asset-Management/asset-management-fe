import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import userApi from './user.service';
import type { User } from './user.types';

function useGetUser(username: string, pinned?: boolean) {
  const queryClient = useQueryClient();
  const queryKey = pinned
    ? ['users', username, { pinned }]
    : ['users', username];
  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, userUsername] }) => {
      if (pinned) {
        return queryClient.getQueryData<User>(queryKey);
      }
      return userApi.getUser(userUsername as string);
    },
    placeholderData: keepPreviousData,
  });
}

export default useGetUser;
