'use client';

import HttpService from '@/lib/services/http.service';

import type { User } from './user.types';

class UserApiService extends HttpService {
  getUserById(id: string) {
    return this.get<User>(`/users/${id}`);
  }

  getUsers() {
    return this.get<User[]>(`/users`);
  }

  getMe() {
    return this.get<User>(`/users/@me`);
  }

  getUser = this.getMe;
}

const userApi = new UserApiService();

export default userApi;
