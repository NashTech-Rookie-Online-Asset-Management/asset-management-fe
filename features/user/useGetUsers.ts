import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import userApi from './user.service';
import type { User, UserSortField } from './user.types';

export type GetUsersProps = PaginationApiProps<UserSortField> & {
  types: string[];
};

function useGetUsers(props: GetUsersProps, queryKey?: string, topUser?: User) {
  return useQuery({
    queryKey: [`users`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      let users = await userApi.getUsers(props);
      if (topUser) {
        users = {
          ...users,
          data: [
            topUser,
            ...users.data.filter((a) => a.username !== topUser.username),
          ],
        };
      }
      return users;
    },
    placeholderData: keepPreviousData,
  });
}

export default useGetUsers;
