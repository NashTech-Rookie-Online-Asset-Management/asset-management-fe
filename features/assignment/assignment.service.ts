import type { ApiMessage, PaginationApiProps } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type { Asset } from '../asset/asset.types';
import type {
  Assignment,
  AssignmentRequest,
  AvailableUser,
  MyAssignmentSortField,
} from './assignment.types';

class AssignmentService extends BaseApiService {
  constructor() {
    super('assignment');
  }

  getAvailableUser(pagination: PaginationApiProps, assignmentId: string) {
    return this.httpClient.get<GetList<AvailableUser>>(`/user/available`, {
      params: {
        ...pagination,
        assignmentId,
      },
    });
  }

  getAvailableAsset(pagination: PaginationApiProps) {
    return this.httpClient.get<GetList<Asset>>('/asset/available', {
      params: {
        ...pagination,
      },
    });
  }

  getAll() {
    return this.httpClient.get<Assignment[]>('/');
  }

  create(data: AssignmentRequest) {
    return this.httpClient.post<Assignment>(`/`, data);
  }

  async get(id: string) {
    const result = await this.httpClient.get<Assignment>(`/${id}`);
    return {
      ...result,
      assignedDate: new Date(result.assignedDate).toISOString().split('T')[0],
    } as Assignment;
  }

  edit(id: string, data: AssignmentRequest) {
    return this.httpClient.put<Assignment>(`/${id}`, data);
  }

  getMyAssignments(pagination: PaginationApiProps<MyAssignmentSortField>) {
    return this.httpClient.get<GetList<Assignment>>('/user/assignments', {
      params: {
        ...pagination,
      },
    });
  }

  respondToAssignment(id: number, state: boolean) {
    return this.httpClient.put<ApiMessage>(`/respond/${id}`, {
      state,
    });
  }
}

const assignmentService = new AssignmentService();
export default assignmentService;
