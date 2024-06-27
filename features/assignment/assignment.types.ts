import type { Asset } from '../asset/asset.types';
import type { Account } from '../auth/auth.types';

export type AvailableUser = Pick<Account, 'staffCode' | 'fullName' | 'type'>;

export type AssignmentRequest = {
  staffCode: string;
  assetCode: string;
  assignedDate: string;
  note?: string;
};

export type AssignmentResponse = {
  assignedDate: string;
  assignedTo: AvailableUser;
  asset: Asset;
};

export type Assignment = {
  id: number;
  assignedDate: string;
  note: string;
  assignedBy: Account;
  assignedTo: Account;
  // ! Change to ReturningRequest's type
  returningRequest: {
    id: number;
    returnedDate: string;
  };
  asset: Asset;
};
