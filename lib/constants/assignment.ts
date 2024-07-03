import { AssignmentState } from '../@types/api';

export const AssignmentStateOptions = {
  [AssignmentState.ACCEPTED]: 'Accepted',
  [AssignmentState.DECLINED]: 'Declined',
  [AssignmentState.IS_REQUESTED]: 'Is requested',
  [AssignmentState.WAITING_FOR_ACCEPTANCE]: 'Waiting for acceptance',
};
