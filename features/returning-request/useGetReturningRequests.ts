import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import returningRequestApi from './returning-request.service';
import type { ReturningRequestSortField } from './returning-request.type';

export type GetReturningRequestsProps =
  PaginationApiProps<ReturningRequestSortField> & {
    states: string[];
    returnedDate?: string;
  };

function useGetReturningRequests(
  props: GetReturningRequestsProps,
  queryKey?: string,
) {
  return useQuery({
    queryKey: [`returning-requests`, queryKey ?? JSON.stringify(props)],
    queryFn: async () => {
      return returningRequestApi.getReturningRequests(props);
    },
    placeholderData: keepPreviousData,
  });
}

export default useGetReturningRequests;
