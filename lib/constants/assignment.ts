import { AssignmentState } from '../@types/api';

export const AssignmentStateOptions = {
  [AssignmentState.ACCEPTED]: 'Accepted',
  [AssignmentState.DECLINED]: 'Declined',
  [AssignmentState.IS_REQUESTED]: 'Waiting for returning',
  [AssignmentState.WAITING_FOR_ACCEPTANCE]: 'Waiting for acceptance',
};
