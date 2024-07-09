import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ReturningRequest } from '../returning-request/returning-request.type';
import assignmentService from './assignment.service';

function useRequestForReturning(id: number) {
  const queryClient = useQueryClient();
  return useMutation<ReturningRequest, AppAxiosError>({
    mutationFn: () => assignmentService.requestForReturning(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      queryClient.invalidateQueries({ queryKey: ['returning-requests'] });
    },
  });
}

export default useRequestForReturning;
