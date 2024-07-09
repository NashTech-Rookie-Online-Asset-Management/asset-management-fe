import { RequestState } from '../@types/api';

export const ReturningRequestStateOptions = {
  [RequestState.COMPLETED]: 'Completed',
  [RequestState.WAITING_FOR_RETURNING]: 'Waiting for returning',
};

export const ReturningRequestStateColors = {
  [RequestState.COMPLETED]: 'bg-green-500',
  [RequestState.WAITING_FOR_RETURNING]: 'bg-yellow-500',
};
