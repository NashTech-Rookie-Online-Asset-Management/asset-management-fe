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

export const userSortFields = [
  'staffCode',
  'name',
  'joinedDate',
  'type',
  'updatedAt',
] as const;

export type UserSortField = (typeof userSortFields)[number];

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  joinedAt: string;
  type: string;
  location?: string | undefined;
};

export type UpdateUserRequest = {
  dob?: string;
  gender?: string;
  joinedAt?: string;
  type?: string;
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
  location: Location;
};
export type UpdateUserResponse = {
  staffCode: string;
  firstName: string;
  lastName: string;
  username: string;
  dob: Date;
  gender: Gender;
  joinedAt: Date;
  type: AccountType;
};
