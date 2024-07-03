import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import returningRequestApi from './returning-request.service';

function useToggleReturningRequest(id: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError, boolean>({
    mutationFn: (state: boolean) =>
      returningRequestApi.toggleReturningRequest(id, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['returning-requests'] });
    },
  });
}

export default useToggleReturningRequest;
