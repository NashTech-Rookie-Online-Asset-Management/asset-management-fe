import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import assignmentService from './assignment.service';
import type {
  Assignment,
  AssignmentRequest,
  AssignmentResponse,
  GetAssignmentProps,
} from './assignment.types';

export function useAvailableUser(
  pagination: PaginationApiProps,
  id: string | string[],
) {
  const transformedId = Array.isArray(id) ? id.join(',') : id;
  return useQuery({
    queryKey: [
      'assignments',
      ...Object.values(pagination),
      'user',
      'available',
    ],
    queryFn: () =>
      assignmentService.getAvailableUser(pagination, transformedId),
  });
}

export function useAvailableAsset(pagination: PaginationApiProps) {
  return useQuery({
    queryKey: [
      'assignments',
      ...Object.values(pagination),
      'asset',
      'available',
    ],
    queryFn: () => assignmentService.getAvailableAsset(pagination),
  });
}

export function useCreateAssignment() {
  const queryClient = useQueryClient();
  return useMutation<AssignmentResponse, AppAxiosError, AssignmentRequest>({
    mutationFn: (data) => assignmentService.create(data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['assignments', data.id.toString(), { pinned: true }],
        data,
      );
    },
  });
}

type GetAssignmentOptions = {
  pinned?: boolean;
  initialData?: Assignment;
};

export function useAssignment(
  assignmentId: string | number,
  { initialData, pinned }: GetAssignmentOptions = {},
) {
  const queryClient = useQueryClient();
  const queryKey = pinned
    ? ['assignments', assignmentId, { pinned }]
    : ['assignments', assignmentId];

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [, id] }) => {
      if (pinned) {
        return queryClient.getQueryData<Assignment>(queryKey);
      }
      return assignmentService.get(id as string);
    },
    initialData: () =>
      initialData || queryClient.getQueryData<Assignment>(queryKey),
  });
}

type EditAssignmentRequest = { id: string; data: AssignmentRequest };

export function useEditAssignment() {
  const queryClient = useQueryClient();
  return useMutation<AssignmentResponse, AppAxiosError, EditAssignmentRequest>({
    mutationFn: (props) => assignmentService.edit(props.id, props.data),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['assignments', data.id.toString(), { pinned: true }],
        data,
      );
      queryClient.invalidateQueries({
        queryKey: ['assignments', data.id],
        exact: true,
      });
    },
  });
}

export function useAssignments(
  options: GetAssignmentProps,
  topAssignment?: Assignment,
) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['assignments', JSON.stringify(options)],
    queryFn: async () => {
      let assignments = await assignmentService.getAll(options);
      if (topAssignment) {
        const assignment = queryClient.getQueryData<Assignment>([
          'assignments',
          topAssignment.id,
          { pinned: true },
        ]);
        if (!assignment) {
          return assignments;
        }
        assignments = {
          ...assignments,
          data: [
            assignment,
            ...assignments.data.filter((a) => a.id !== topAssignment.id),
          ],
        };
      }
      return assignments;
    },
  });
}
