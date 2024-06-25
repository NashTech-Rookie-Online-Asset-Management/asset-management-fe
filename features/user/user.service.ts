'use client';

import type { ApiMessage, Order } from '@/lib/@types/api';
import HttpService from '@/lib/services/http.service';

import type {
  CreateUserRequest,
  CreateUserResponse,
  User,
  UserSortField,
} from './user.types';

class UserApiService extends HttpService {
  getUserById(id: string) {
    return this.get<User>(`/users/${id}`);
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
    return this.get<GetList<User>>('users', {
      params: {
        page,
        take,
        search: search || undefined,
        types: types.join(',') || undefined,
        [`${sortField}Order`]: sortOrder,
      },
    });
  }

  getMe() {
    return this.get<User>(`/users/@me`);
  }

  getUser(username: string) {
    return this.get<User>(`users/${username}`);
  }

  postUser(data: CreateUserRequest) {
    return this.post<CreateUserResponse>('/users', data);
  }

  deleteUser(staffCode: string) {
    return this.delete(`users/${staffCode}`) as Promise<ApiMessage>;
  }
}

const userApi = new UserApiService();

export default userApi;
