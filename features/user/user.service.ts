'use client';

import type { Order } from '@/lib/@types/api';
import HttpService from '@/lib/services/http.service';

import type { User, UserSortField } from './user.types';

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
}

const userApi = new UserApiService();

export default userApi;
