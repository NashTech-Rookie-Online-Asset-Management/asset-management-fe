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
};

export type UserSortField = 'staffCode' | 'name' | 'joinedDate' | 'type';
