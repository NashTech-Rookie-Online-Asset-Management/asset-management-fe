'use client';

import React from 'react';

import { LoadingButton } from '@/components/custom/loading-button';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import type { Assignment } from '@/features/assignment/assignment.types';
import useRespondToAssignment from '@/features/assignment/useRespondToAssignment';

type Props = {
  assignment: Assignment;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function DeclineAssignmentDialog({ assignment, isOpen, onOpenChange }: Props) {
  const { mutateAsync: respond, isPending } = useRespondToAssignment(
    assignment.id,
  );

  const handleRespondClick = async () => {
    await respond(false);
    toast({
      title: 'Assignment declined',
      description: `Declined ${assignment.asset.assetCode} as your assignment!`,
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
          <p>Do you want to decline this assignment?</p>

          <DialogFooter className="mt-4 flex sm:justify-start">
            <LoadingButton
              data-id="decline-button"
              type="submit"
              isLoading={isPending}
              onClick={handleRespondClick}
            >
              Decline
            </LoadingButton>
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                data-id="decline-assignment-cancel-button"
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

export default DeclineAssignmentDialog;
