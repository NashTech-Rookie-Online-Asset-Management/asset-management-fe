'use client';

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
import useRequestForReturning from '@/features/assignment/useRequestForReturning';

type Props = {
  assignment: Assignment;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function RequestForReturningDialog({
  assignment,
  isOpen,
  onOpenChange,
}: Props) {
  const { mutateAsync: respond, isPending } = useRequestForReturning(
    assignment.id,
  );

  const handleRespondClick = async () => {
    await respond();
    toast({
      title: 'Request created',
      description: `Created returning request for assignment ${assignment.asset.assetCode}!`,
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
          <p>Do you want to create a returning request for this asset?</p>

          <DialogFooter className="mt-4 flex sm:justify-start">
            <LoadingButton
              data-id="returning-assignment-yes-button"
              type="submit"
              isLoading={isPending}
              onClick={handleRespondClick}
            >
              Yes
            </LoadingButton>
            <DialogClose asChild>
              <Button
                variant="secondary"
                onClick={() => onOpenChange(false)}
                data-id="returning-assignment-no-button"
              >
                No
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RequestForReturningDialog;
