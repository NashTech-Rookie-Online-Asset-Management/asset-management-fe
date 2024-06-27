export enum AccountType {
  STAFF = 'STAFF',
  ADMIN = 'ADMIN',
}

export enum Location {
  HCM = 'HCM',
  HN = 'HN',
  DN = 'DN',
}

export enum AssetState {
  AVAILABLE = 'AVAILABLE',
  NOT_AVAILABLE = 'NOT_AVAILABLE',
  ASSIGNED = 'ASSIGNED',
  WAITING_FOR_RECYCLING = 'WAITING_FOR_RECYCLING',
  RECYCLED = 'RECYCLED',
}

export type Account = {
  id: number;
  staffCode: string;
  firstName: string;
  lastName: string;
  email: string;
  type: AccountType;
  location: Location;
  fullName: string;
};

export type Category = {
  id: number;
  name: string;
  prefix: string;
};

export type Asset = {
  id: number;
  assetCode: string;
  name: string;
  specification: string;
  installedDate: string;
  state: AssetState;
  location: Location;
  category: Category;
};

export type Assignment = {
  id: number;
  assignedDate: string;
  note: string;
  assignedBy: Account;
  assignedTo: Account;
  asset: Asset;
};
