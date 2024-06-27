import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import userApi from './user.service';
import type { User } from './user.types';

type GetUserOptions = {
  pinned?: boolean;
  initialData?: User;
};

function useGetUser(
  username: string,
  { pinned, initialData }: GetUserOptions = {},
) {
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
    initialData: () => initialData || queryClient.getQueryData<User>(queryKey),
    placeholderData: keepPreviousData,
  });
}

export default useGetUser;
