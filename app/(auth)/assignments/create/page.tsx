'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { TypographyH4 } from '@/components/typos/h4';
import { useCreateAssignment } from '@/features/assignment/assignment.hook';

import AssignmentForm from '../components/assignment-form';

export default function CreateAssignmentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate, isSuccess, isPending, data } = useCreateAssignment();

  if (isSuccess)
    router.push(
      `/assignments?${searchParams.toString()}&assignmentId=${data.id}`,
    );

  return (
    <>
      <TypographyH4 className="mb-6 text-primary">
        Create Assignment
      </TypographyH4>

      <AssignmentForm
        isPending={isPending}
        onSubmit={(values) => {
          mutate({
            assetCode: values.asset.assetCode,
            staffCode: values.assignedTo.staffCode,
            assignedDate: new Date(values.assignedDate).toISOString(),
            note: values.note,
          });
        }}
      />
    </>
  );
}
