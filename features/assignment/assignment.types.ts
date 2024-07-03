import type { AssignmentState, PaginationApiProps } from '@/lib/@types/api';

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
  id: number;
};

export type Assignment = {
  state: AssignmentState;
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

export type AssignmentSortField =
  | 'id'
  | 'assetCode'
  | 'assetName'
  | 'assignedTo'
  | 'assignedBy'
  | 'assignedDate'
  | 'state';

export const myAssignmentsSortFields = [
  'assetCode',
  'name',
  'category',
  'state',
  'assignedDate',
] as const;

export type GetAssignmentProps = PaginationApiProps & {
  states: string[];
};

export type MyAssignmentSortField = (typeof myAssignmentsSortFields)[number];
