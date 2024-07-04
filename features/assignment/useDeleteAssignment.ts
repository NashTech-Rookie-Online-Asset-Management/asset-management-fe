import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { ApiMessage } from '@/lib/@types/api';

import assignmentService from './assignment.service';

function useDeleteAssignment(id: number) {
  const queryClient = useQueryClient();
  return useMutation<ApiMessage, AppAxiosError>({
    mutationFn: () => assignmentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
    },
  });
}

export default useDeleteAssignment;
