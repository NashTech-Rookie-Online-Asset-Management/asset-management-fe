import BaseApiService from '@/lib/services/baseApi.service';

import type { Asset } from '../model';
import type {
  AvailableUser,
  CreateAssignmentRequest,
  CreateAssignmentResponse,
} from './assignment.type';

class AssignmentService extends BaseApiService {
  constructor() {
    super('assignment');
  }

  getAvailableUser() {
    return this.httpClient.get<AvailableUser[]>(`/user/available`);
  }

  getAvailableAsset() {
    return this.httpClient.get<Asset[]>('/asset/available');
  }

  create(data: CreateAssignmentRequest) {
    return this.httpClient.post<CreateAssignmentResponse>(`/`, data);
  }
}

const assignmentService = new AssignmentService();
export default assignmentService;
