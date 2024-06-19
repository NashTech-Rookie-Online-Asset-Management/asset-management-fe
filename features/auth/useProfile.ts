import { keepPreviousData, useQuery } from '@tanstack/react-query';

import authApi from './auth.service';

function useProfile() {
  return useQuery({
    queryKey: [`auth/profile`],
    queryFn: () => authApi.getProfile(),
    placeholderData: keepPreviousData,
  });
}

export default useProfile;
