import type { Account, Asset } from '../model';

export type AvailableUser = Pick<
  Account,
  'staffCode' | 'firstName' | 'lastName' | 'type'
>;

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
