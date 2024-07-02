import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import assignmentService from './assignment.service';

function useRespondToAssignment(id: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError, boolean>({
    mutationFn: (state: boolean) =>
      assignmentService.respondToAssignment(id, state),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export default useRespondToAssignment;
