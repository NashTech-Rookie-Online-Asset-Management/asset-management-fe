import type { Account } from '../model';

export type AvailableUser = Pick<
  Account,
  'staffCode' | 'firstName' | 'lastName' | 'type'
>;
export type CreateAssignmentRequest = {
  staffCode: string;
  assetCode: string;
  assignedDate: Date;
  note?: string;
};
export type CreateAssignmentResponse = {};
