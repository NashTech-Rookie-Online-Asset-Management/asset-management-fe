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
import useGetUser from '@/features/user/useGetUser';
import {
  AccountTypeOptions,
  GenderOptions,
  LocationOptions,
} from '@/lib/constants/user';
import { displayDate } from '@/lib/utils/date';

export default function DetailedUserDialog({
  username,
  isOpen,
  onOpenChange,
}: {
  username: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}) {
  const { data: user, isLoading } = useGetUser(username);

  return (
    <Dialog open={isOpen} modal onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Detailed User Information</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : user ? (
          <div className="w-full space-y-4 py-4 text-sm">
            {[
              { label: 'Staff Code', value: user.staffCode },
              {
                label: 'Full Name',
                value: `${user.firstName} ${user.lastName}`,
              },
              { label: 'Username', value: user.username },
              {
                label: 'Date of Birth',
                value: displayDate(user.dob),
              },
              { label: 'Gender', value: GenderOptions[user.gender] },
              { label: 'Joined Date', value: displayDate(user.joinedAt) },
              { label: 'Type', value: AccountTypeOptions[user.type] },
              { label: 'Location', value: LocationOptions[user.location] },
            ].map(({ label, value }) => (
              <DataRow key={label} label={label} value={value} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-gray-400">
            No user to display.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
