/* eslint-disable unused-imports/no-unused-vars */
enum UserStatus {
  CREATED = 'CREATED',
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
}

enum AccountType {
  ADMIN = 'ADMIN',
  STAFF = 'STAFF',
}

enum Location {
  HCM = 'HCM',
  HN = 'HN',
  DN = 'DN',
}

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

enum AssetState {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  ASSIGNED = 'ASSIGNED',
  WAITING_FOR_RECYCLING = 'WAITING_FOR_RECYCLING',
  RECYCLED = 'RECYCLED',
}

enum AssignmentState {
  WAITING_FOR_ACCEPTANCE = 'WAITING_FOR_ACCEPTANCE',
  ACCEPTED = 'ACCEPTED',
  IS_REQUESTED = 'IS_REQUESTED',
}

enum RequestState {
  WAITING_FOR_RETURNING = 'WAITING_FOR_RETURNING',
  COMPLETED = 'COMPLETED',
}

type ApiMessage = {
  message?: string;
};
