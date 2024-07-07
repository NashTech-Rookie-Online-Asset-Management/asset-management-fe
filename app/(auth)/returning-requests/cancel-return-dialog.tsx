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
import type { ReturningRequest } from '@/features/returning-request/returning-request.type';
import useToggleReturningRequest from '@/features/returning-request/useToggleReturningRequest';

type Props = {
  request: ReturningRequest;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

function CancelReturnDialog({ request, isOpen, onOpenChange }: Props) {
  const { mutateAsync: respond, isPending } = useToggleReturningRequest(
    request.id,
  );

  const handleRespondClick = async () => {
    await respond(false);
    toast({
      title: 'Returning request canceled',
      description: `Cancelled returning request ${request.id}!`,
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
          <p>Do you want to cancel this returning request?</p>

          <DialogFooter className="mt-4 flex sm:justify-start">
            <LoadingButton
              data-id="yes-button"
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
                data-id="no-button"
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

export default CancelReturnDialog;
