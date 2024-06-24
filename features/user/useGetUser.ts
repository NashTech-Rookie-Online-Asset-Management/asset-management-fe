import { keepPreviousData, useQuery } from '@tanstack/react-query';

import userApi from './user.service';

function useGetUser(username: string) {
  return useQuery({
    queryKey: ['users', username],
    queryFn: () => userApi.getUser(username),
    placeholderData: keepPreviousData,
  });
}

export default useGetUser;
