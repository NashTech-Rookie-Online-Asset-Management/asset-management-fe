import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import userApi from './user.service';
import type { User, UserSortField } from './user.types';

export type GetUsersProps = PaginationApiProps<UserSortField> & {
  types: string[];
};

function useGetUsers(props: GetUsersProps, queryKey?: string, topUser?: User) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: [`users`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      let users = await userApi.getUsers(props);
      if (topUser) {
        const user = queryClient.getQueryData<User>([
          'users',
          topUser.staffCode,
          { pinned: true },
        ]);
        if (!user) {
          return users;
        }
        users = {
          ...users,
          data: [
            user,
            ...users.data.filter((a) => a.staffCode !== topUser.staffCode),
          ],
        };
      }
      return users;
    },
  });
}

export default useGetUsers;
