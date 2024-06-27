import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import assignmentService from './assignment.service';
import type { AssignmentRequest, AssignmentResponse } from './assignment.type';

export function useAvailableUser(
  pagination: PaginationApiProps,
  id: string | string[],
) {
  const transformedId = Array.isArray(id) ? id.join(',') : id;
  return useQuery({
    queryKey: [
      'assignment/user/available',
      pagination?.page,
      pagination?.take,
      pagination?.search,
      pagination?.sortField,
      pagination?.sortOrder,
    ],
    queryFn: () =>
      assignmentService.getAvailableUser(pagination, transformedId),
    placeholderData: keepPreviousData,
  });
}

export function useAvailableAsset(pagination: PaginationApiProps) {
  return useQuery({
    queryKey: [
      'assignment/asset/available',
      pagination.page,
      pagination.take,
      pagination.search,
      pagination?.sortField,
      pagination?.sortOrder,
    ],
    queryFn: () => assignmentService.getAvailableAsset(pagination),
    placeholderData: keepPreviousData,
  });
}

export function useCreateAssignment() {
  return useMutation<AssignmentResponse, AppAxiosError, AssignmentRequest>({
    mutationFn: (data) => assignmentService.create(data),
  });
}

export function useAssignment(id: string) {
  return useQuery({
    queryKey: ['assignment', id],
    queryFn: () => assignmentService.get(id),
  });
}

type EditAssignmentRequest = { id: string; data: AssignmentRequest };

export function useEditAssignment() {
  return useMutation({
    mutationFn: (props: EditAssignmentRequest) =>
      assignmentService.edit(props.id, props.data),
  });
}

export function useAssignments() {
  return useQuery({
    queryKey: ['assignments'],
    queryFn: () => assignmentService.getAll(),
  });
}
