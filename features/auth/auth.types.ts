import type { AccountType, UserStatus } from '@/lib/@types/api';

export type LoginRequest = {
  username: string;
  password: string;
};

export type ChangePasswordFirstTimeRequest = {
  newPassword: string;
};
export type ChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type AuthUserResponse = {
  accessToken: string;
  refreshToken: string;
};

export type Account = {
  id: number;
  staffCode: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  type: AccountType;
  location: Location;
  fullName: string;
  status: UserStatus;
};

export type Profile = Account;
