import type { RequestState } from '@/lib/@types/api';

import type { Assignment } from '../assignment/assignment.types';
import type { Account } from '../auth/auth.types';

export type ReturningRequest = {
  id: number;
  assignment: Assignment;
  requestedBy: Account;
  acceptedBy?: Account;
  returnedDate?: string;
  state: keyof typeof RequestState;
};

export const returningRequestSortFields = [
  'id',
  'assetCode',
  'assetName',
  'requestedBy',
  'assignedDate',
  'acceptedBy',
  'returnedDate',
  'state',
] as const;

export type ReturningRequestSortField =
  (typeof returningRequestSortFields)[number];
