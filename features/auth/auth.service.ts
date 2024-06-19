import BaseApiService from '@/lib/services/baseApi.service';

import type {
  AuthUserResponse,
  ChangePasswordFirstTimeRequest,
  LoginRequest,
  Profile,
} from './auth.types';

class AuthApiService extends BaseApiService {
  constructor() {
    super('auth');
  }

  login(data: LoginRequest) {
    return this.httpClient.post<AuthUserResponse>('/login', data);
  }

  logout() {
    return this.httpClient.post<ApiMessage>('/logout');
  }

  changePasswordFirstTime(data: ChangePasswordFirstTimeRequest) {
    return this.httpClient.patch<ApiMessage>(
      '/change-password-first-time',
      data,
    );
  }

  getProfile() {
    return this.httpClient.get<Profile>(`/profile`);
  }

  checkAuth(accessToken: string) {
    return this.httpClient.get<Profile>(`/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }
}

const authApi = new AuthApiService();

export default authApi;
