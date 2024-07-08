import { AssignmentState } from '../@types/api';

export const AssignmentStateOptions = {
  [AssignmentState.ACCEPTED]: 'Accepted',
  [AssignmentState.DECLINED]: 'Declined',
  [AssignmentState.IS_REQUESTED]: 'Waiting for returning',
  [AssignmentState.WAITING_FOR_ACCEPTANCE]: 'Waiting for acceptance',
};

export const AssignmentStateColors = {
  [AssignmentState.ACCEPTED]: 'bg-green-500',
  [AssignmentState.DECLINED]: 'bg-red-500',
  [AssignmentState.IS_REQUESTED]: 'bg-blue-500',
  [AssignmentState.WAITING_FOR_ACCEPTANCE]: 'bg-yellow-500',
};
