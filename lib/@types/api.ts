/* eslint-disable unused-imports/no-unused-vars */
export enum UserStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

export enum AccountType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
  ROOT = 'ROOT',
}

export enum Location {
  HCM = 'HCM',
  HN = 'HN',
  DN = 'DN',
}

export enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
}

export enum AssetState {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ASSIGNED = 'ASSIGNED',
  WAITING_FOR_RECYCLING = 'WAITING_FOR_RECYCLING',
  RECYCLED = 'RECYCLED',
}

export enum AssignmentState {
  WAITING_FOR_ACCEPTANCE = 'WAITING_FOR_ACCEPTANCE',
  ACCEPTED = 'ACCEPTED',
  IS_REQUESTED = 'IS_REQUESTED',
}

export enum RequestState {
  WAITING_FOR_RETURNING = 'WAITING_FOR_RETURNING',
  COMPLETED = 'COMPLETED',
}

export type ApiMessage = {
  message?: string;
};

export enum Order {
  ASC = 'asc',
  DESC = 'desc',
}
