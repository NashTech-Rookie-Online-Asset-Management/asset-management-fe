'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
import type { Asset } from '@/features/asset/asset.types';
import useDeleteAsset from '@/features/asset/useDeleteAsset';
import useGetAsset from '@/features/asset/useGetAsset';

export default function DeleteAssetDialog({
  asset,
  isOpen,
  onOpenChange,
}: {
  asset: Asset;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const searchParams = useSearchParams();

  const { data } = useGetAsset(asset.id);
  const { mutateAsync: deleteAsset, isPending } = useDeleteAsset(asset.id);

  const handleDeleteAsset = async () => {
    await deleteAsset();
    toast({
      title: 'Asset deleted',
      description: `Asset ${asset.assetCode} has been deleted successfully`,
      variant: 'success',
      duration: 1500,
    });
    onOpenChange(false);
  };

  const isAbleToDelete = data?.assignments.length === 0;

  if (!data) {
    return null;
  }

  return (
    <Dialog open={isOpen} modal onOpenChange={onOpenChange}>
      <DialogContent hideCloseButton={isAbleToDelete}>
        <DialogHeader>
          <DialogTitle>
            {isAbleToDelete ? 'Delete Asset' : 'Cannot Delete Asset'}
          </DialogTitle>
        </DialogHeader>

        <div className="text-sm">
          {isAbleToDelete ? (
            <>
              <p>Do you want to delete this asset?</p>

              <DialogFooter className="mt-4 flex sm:justify-start">
                <LoadingButton
                  data-id="delete-button"
                  type="submit"
                  isLoading={isPending}
                  onClick={handleDeleteAsset}
                >
                  Delete
                </LoadingButton>
                <DialogClose asChild>
                  <Button
                    variant="secondary"
                    onClick={() => onOpenChange(false)}
                    data-id="change-password-cancel-button"
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <p>
              Cannot delete the asset because it belongs to one or more
              historical assignments.
              <br />
              If the asset is not able to be used anymore, please update its
              state in{' '}
              <Link
                href={`/assets/${asset.id}?${searchParams.toString()}`}
                className="cursor-pointer text-blue-500 underline"
              >
                Edit Asset page
              </Link>
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
