import DataRow from '@/components/custom/data-row';
import LoadingSpinner from '@/components/custom/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAssignment } from '@/features/assignment/assignment.hook';
import { AssignmentStateOptions } from '@/lib/constants/assignment';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignmentId: number;
};

export default function AssignmentDialog(props: Props) {
  const { data, isLoading } = useAssignment(props.assignmentId);

  function getContent() {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (!data) {
      return (
        <p className="py-8 text-center text-sm text-gray-400">
          No assignment to display.
        </p>
      );
    }

    return (
      <div className="w-full space-y-4 py-4 text-sm">
        {[
          { label: 'Asset Code', value: data.asset.assetCode },
          { label: 'Asset Name', value: data.asset.name },
          { label: 'Specification', value: data.asset.specification },
          { label: 'Assigned to', value: data.assignedTo.username },
          { label: 'Assigned by', value: data.assignedBy.username },
          { label: 'Assigned date', value: data.assignedDate },
          { label: 'State', value: AssignmentStateOptions[data.state] },
          { label: 'Note', value: data.note },
        ].map(({ label, value }) => (
          <DataRow key={label} label={label} value={value} />
        ))}
      </div>
    );
  }

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detailed Assignment Information</DialogTitle>
        </DialogHeader>

        {getContent()}
      </DialogContent>
    </Dialog>
  );
}
