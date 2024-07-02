import { AssignmentState } from '../@types/api';

export const AssignmentStateOptions = {
  [AssignmentState.ACCEPTED]: 'Accepted',
  [AssignmentState.WAITING_FOR_ACCEPTANCE]: 'Waiting for acceptance',
  [AssignmentState.IS_REQUESTED]: 'Waiting for return',
};
