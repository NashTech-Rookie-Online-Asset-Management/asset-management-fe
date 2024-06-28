import { keepPreviousData, useQuery } from '@tanstack/react-query';

import authApi from './auth.service';
import type { Account } from './auth.types';

type GetProfileOptions = {
  initialData?: Account;
};

function useProfile({ initialData }: GetProfileOptions = {}) {
  return useQuery({
    queryKey: [`auth/profile`],
    queryFn: () => authApi.getProfile(),
    initialData,
    placeholderData: keepPreviousData,
  });
}

export default useProfile;
