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

export type Profile = {
  id: number | string;
  staffCode: string;
  username: string;
  status: UserStatus;
  type: AccountType;
};
