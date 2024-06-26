import type { PaginationApiProps } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type { Asset } from '../model';
import type {
  AssignmentRequest,
  AssignmentResponse,
  AvailableUser,
} from './assignment.type';

class AssignmentService extends BaseApiService {
  constructor() {
    super('assignment');
  }

  getAvailableUser(pagination: PaginationApiProps) {
    return this.httpClient.get<GetList<AvailableUser>>(`/user/available`, {
      params: {
        ...pagination,
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

  create(data: AssignmentRequest) {
    return this.httpClient.post<AssignmentResponse>(`/`, data);
  }

  async get(id: string) {
    const result = await this.httpClient.get<AssignmentResponse>(`/${id}`);
    return {
      ...result,
      assignedDate: new Date(result.assignedDate).toISOString().split('T')[0],
      assignedTo: {
        ...result.assignedTo,
        name: `${result.assignedTo.firstName} ${result.assignedTo.lastName}`,
      },
    };
  }

  edit(id: string, data: AssignmentRequest) {
    return this.httpClient.put<AssignmentResponse>(`/${id}`, data);
  }
}

const assignmentService = new AssignmentService();
export default assignmentService;
