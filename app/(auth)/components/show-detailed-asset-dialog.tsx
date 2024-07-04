'use client';

import DataRow from '@/components/custom/data-row';
/* eslint-disable no-nested-ternary */
import LoadingSpinner from '@/components/custom/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useGetAsset from '@/features/asset/useGetAsset';
import { AssetStateOptions } from '@/lib/constants/asset';
import { LocationOptions } from '@/lib/constants/user';
import { displayDate } from '@/lib/utils/date';

const columns = ['Date', 'Assigned to', 'Assigned by', 'Returned date'];

export default function DetailedAssetDialog({
  assetId,
  isOpen,
  onOpenChange,
}: {
  assetId: number;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { data: asset, isLoading } = useGetAsset(assetId);

  return (
    <Dialog open={isOpen} modal onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] min-w-[750px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Detailed Asset Information</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : asset ? (
          <div className="w-full space-y-4 py-4 text-sm">
            {[
              { label: 'Asset Code', value: asset.assetCode },
              { label: 'Asset Name', value: asset.name },
              { label: 'Category', value: asset.category.name },
              {
                label: 'Installed Date',
                value: displayDate(asset.installedDate.toString()),
              },
              { label: 'State', value: AssetStateOptions[asset.state] },
              { label: 'Location', value: LocationOptions[asset.location] },
              { label: 'Specification', value: asset.specification },
            ].map(({ label, value }) => (
              <DataRow key={label} label={label} value={value} />
            ))}

            <div className="flex gap-4">
              <p className="w-1/4">History</p>
              <div className="mt-2 max-h-[210px] w-3/4 overflow-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {columns.map((column) => (
                        <TableHead key={column}>{column}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset.assignments && asset.assignments.length > 0 ? (
                      asset.assignments.map((assignment) => (
                        <TableRow key={assignment.id}>
                          <TableCell>
                            {displayDate(assignment.assignedDate)}
                          </TableCell>
                          <TableCell>
                            {assignment.assignedTo.username}
                          </TableCell>
                          <TableCell>
                            {assignment.assignedBy.username}
                          </TableCell>
                          <TableCell>
                            {assignment.returningRequest?.returnedDate
                              ? displayDate(
                                  assignment.returningRequest.returnedDate,
                                )
                              : ''}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="text-center text-xs text-gray-400"
                        >
                          No assignment to display.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-gray-400">
            No asset to display.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
