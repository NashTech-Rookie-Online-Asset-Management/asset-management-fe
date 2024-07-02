import { keepPreviousData, useQuery } from '@tanstack/react-query';

import type { PaginationApiProps } from '@/lib/@types/api';

import assignmentService from './assignment.service';
import type { MyAssignmentSortField } from './assignment.types';

export type GetMyAssignments = PaginationApiProps<MyAssignmentSortField>;

function useGetMyAssignments(props: GetMyAssignments) {
  return useQuery({
    queryKey: [`assignments/mine`, ...Object.values(props)],
    queryFn: () => assignmentService.getMyAssignments(props),
    placeholderData: keepPreviousData,
  });
}

export default useGetMyAssignments;
