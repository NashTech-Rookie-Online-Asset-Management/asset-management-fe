import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import assignmentService from './assignment.service';
import type {
  CreateAssignmentRequest,
  CreateAssignmentResponse,
} from './assignment.type';

export function useAvailableUser() {
  return useQuery({
    queryKey: ['assignment/user/available'],
    queryFn: () => assignmentService.getAvailableUser(),
    placeholderData: keepPreviousData,
  });
}

export function useAvailableAsset() {
  return useQuery({
    queryKey: ['assignment/asset/available'],
    queryFn: () => assignmentService.getAvailableAsset(),
    placeholderData: keepPreviousData,
  });
}

export function useCreateAssignment() {
  return useMutation<
    CreateAssignmentResponse,
    AppAxiosError,
    CreateAssignmentRequest
  >({
    mutationFn: (data) => assignmentService.create(data),
  });
}
