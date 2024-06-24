import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { Order } from '@/lib/@types/api';

import userApi from './user.service';
import type { UserSortField } from './user.types';

function useGetUsers({
  page,
  take,
  search,
  types,
  sortField,
  sortOrder,
}: {
  page: number;
  take: number;
  search: string;
  types: string[];
  sortField: UserSortField;
  sortOrder: Order;
}) {
  return useQuery({
    queryKey: [`users`],
    queryFn: () =>
      userApi.getUsers({
        page,
        take,
        search,
        types,
        sortField,
        sortOrder,
      }),
    placeholderData: keepPreviousData,
  });
}

export default useGetUsers;
