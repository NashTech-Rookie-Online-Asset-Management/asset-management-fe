import type { AccountType, Gender, Location } from '@/lib/@types/api';

export type User = {
  id: number;
  staffCode: string;
  firstName: string;
  lastName: string;
  username: string;
  dob: string;
  gender: Gender;
  joinedAt: string;
  type: AccountType;
  location: Location;
  canDisable?: boolean;
};

export type UserSortField =
  | 'staffCode'
  | 'name'
  | 'joinedDate'
  | 'type'
  | 'updatedAt';

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  joinedAt: string;
  type: string;
  location?: string | undefined;
};

export type CreateUserResponse = {
  staffCode: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  dob: Date;
  gender: Gender;
  joinedAt: Date;
  type: AccountType;
};
