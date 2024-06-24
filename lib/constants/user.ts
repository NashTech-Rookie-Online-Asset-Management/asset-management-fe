import { AccountType, Gender, Location } from '../@types/api';

export const AccountTypeOptions = {
  [AccountType.ADMIN]: 'Admin',
  [AccountType.STAFF]: 'Staff',
};

export const GenderOptions = {
  [Gender.MALE]: 'Male',
  [Gender.FEMALE]: 'Female',
};

export const LocationOptions = {
  [Location.HCM]: 'HCM',
  [Location.HN]: 'HN',
  [Location.DN]: 'DN',
};
