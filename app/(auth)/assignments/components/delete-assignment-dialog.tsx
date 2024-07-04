'use client';

import { DialogClose } from '@radix-ui/react-dialog';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
/* eslint-disable no-nested-ternary */
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import type { Assignment } from '@/features/assignment/assignment.types';
import useDeleteAssignment from '@/features/assignment/useDeleteAssignment';

export default function DeleteAssignmentDialog({
  assignment,
  isOpen,
  onOpenChange,
}: {
  assignment: Assignment;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { mutateAsync: deleteAssignment, isPending } = useDeleteAssignment(
    assignment.id,
  );

  const handleDeleteAssignment = async () => {
    await deleteAssignment();
    toast({
      title: 'Assignment deleted',
      description: `Assignment #${assignment.id} has been deleted successfully`,
      variant: 'success',
      duration: 1500,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} modal onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          <p>Do you want to delete this assignment?</p>

          <DialogFooter className="mt-4 flex sm:justify-start">
            <LoadingButton
              data-id="delete-button"
              type="submit"
              isLoading={isPending}
              onClick={handleDeleteAssignment}
            >
              Delete
            </LoadingButton>
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                data-id="delete-assignment-cancel-button"
              >
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
