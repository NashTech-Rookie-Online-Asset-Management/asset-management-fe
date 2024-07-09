import type { AssignmentState, PaginationApiProps } from '@/lib/@types/api';

import type { Asset } from '../asset/asset.types';
import type { Account } from '../auth/auth.types';
import type { ReturningRequest } from '../returning-request/returning-request.type';

export type AvailableUser = Pick<Account, 'staffCode' | 'fullName' | 'type'>;

export type AssignmentRequest = {
  staffCode: string;
  assetCode: string;
  assignedDate: string;
  note?: string;
  updatedAt?: string;
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
  returningRequest?: ReturningRequest;
  asset: Asset;
  updatedAt: string;
  pinned?: boolean;
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
