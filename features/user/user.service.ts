import type { ApiMessage, Order } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  User,
  UserSortField,
} from './user.types';

class UserApiService extends BaseApiService {
  constructor() {
    super('users');
  }

  getUserById(id: string) {
    return this.httpClient.get<User>(`/${id}`);
  }

  getUsers({
    page,
    take,
    search,
    types,
    sortField,
    sortOrder,
  }: {
    page: number;
    take: number;
    search: string;
    types: string[];
    sortField: UserSortField;
    sortOrder: Order;
  }) {
    return this.httpClient.get<GetList<User>>('/', {
      params: {
        page,
        take,
        search: search || undefined,
        types: types.join(',') || undefined,
        sortField,
        sortOrder,
      },
    });
  }

  getMe() {
    return this.httpClient.get<User>(`/@me`);
  }

  getUser(username: string) {
    return this.httpClient.get<User>(`/${username}`);
  }

  postUser(data: CreateUserRequest) {
    return this.httpClient.post<CreateUserResponse>('/', data);
  }

  updateUser(userStaffCode: string, data: UpdateUserRequest) {
    return this.httpClient.patch<UpdateUserResponse>(`/${userStaffCode}`, data);
  }

  deleteUser(staffCode: string) {
    return this.httpClient.delete(`/${staffCode}`) as Promise<ApiMessage>;
  }
}

const userApi = new UserApiService();

export default userApi;
