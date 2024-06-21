import type { ApiMessage } from '@/lib/@types/api';
import BaseApiService from '@/lib/services/baseApi.service';

import type {
  AuthUserResponse,
  ChangePasswordFirstTimeRequest,
  ChangePasswordRequest,
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

  changePassword(data: ChangePasswordRequest) {
    return this.httpClient.patch<ApiMessage>('/change-password', data);
  }

  getProfile() {
    return this.httpClient.get<Profile>(`/profile`);
  }

  checkAuth(accessToken: string) {
    return this.httpClient.get<Profile>(`/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      baseURL: `${process.env.API_URL}/api/auth`,
    });
  }
}

const authApi = new AuthApiService();

export default authApi;
